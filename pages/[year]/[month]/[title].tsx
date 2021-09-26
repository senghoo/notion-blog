import Head from 'flareact/head'
import Main from '../../../layout/Main'
import {fetchArticle, fetchPageContent, IArticleHead} from '../../../api/article'
import ArticleHead from '../../../components/ArticleHead'
import '../../../styles/notion.scss'
import css from './Article.module.css'
import {NotionAPI} from '../../../api/notionv3'
import {parsePageID} from '../../../api/utils'
import NotionRender from '../../../components/NotionRender'


export async function articleID(year: string, month: string, title: string): Promise<IArticleHead | null> {
    if (year == null || month == null || title == null) {
        return null
    }
    const onOrAfter = `${year}-${month}-01`
    const onOrBefore = `${year}-${month}-${new Date(parseInt(year), parseInt(month), 0).getDate()}`
    const titleDecoded = decodeURIComponent(title)
    const query = {
        "filter": {
            "and": [
                {
                    "property": "Title",
                    "title": {
                        "equals": titleDecoded
                    }
                },
                {
                    "property": "PublishAt",
                    "date": {
                        "on_or_before": onOrBefore,
                        "on_or_after": onOrAfter
                    }
                }
            ]
        }
    }
    const articles = await fetchArticle(query)
    return articles.length > 0 ? articles[0] : null
}

export async function getEdgeProps({params}) {
    const {year, month, title} = params
    const head = await articleID(year, month, title)
    const notion = new NotionAPI()
    const recordMap = head && await notion.getPage(parsePageID(head.ID))
    const article = head && await fetchPageContent(head.ID)
    return {
        props: {
            head,
            article,
            recordMap
        },
        notFound: !(head && recordMap),
        revalidate: 0
    }
}

export default function title({head, article, recordMap, notFound}) {
    // @ts-ignore
    return (
        <Main>
            <>
                {
                    notFound === false &&
                    <div>
                        <Head
                            defer={false}
                        >

                            <title>{head.Title} - HaoIO</title>
                        </Head>
                        <ArticleHead head={head!}/>
                        {/*<NotionRender blocks={article.children} />*/}
                        <NotionRender recordMap={recordMap}/>
                    </div>
                }
                {
                    notFound === true &&
                    <div>
                        文章不存在
                    </div>
                }
            </>
        </Main>
    )
}
