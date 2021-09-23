import Head from 'flareact/head'
import Main from '../../../layout/Main'
import {fetchArticle, fetchPageContent, IArticleHead} from '../../../api/article'
import ArticleHead from '../../../components/ArticleHead'
import './article.scss'
import css from './Article.module.css'
import NotionRender from '../../../notion'

export async function articleID(year: string, month: string, title: string): Promise<IArticleHead | null> {
    const onOrAfter = `${year}-${month}-01`
    const onOrBefore = `${year}-${month}-${new Date(parseInt("2020"), parseInt("02"), 0).getDate()}`
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
    const article = head == null ? null : await fetchPageContent(head.ID)
    return {
        props: {
            head,
            article
        },
        notFound: head === null,
        revalidate: 0
    }
}

export default function title({head, article, notFound}) {
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
                            <style type="text/css">
                                {(css as any)._getCss && (css as any)._getCss()}
                            </style>
                        </Head>
                        <ArticleHead head={head!}/>
                        <NotionRender blocks={article.children} />
                        <pre className={css.code}>
                            {JSON.stringify(article.children)}
                        </pre>
                    </div>
                }
                {
                    notFound === true &&
                    <div>
                        文章不存在
                        <pre>
                            {JSON.stringify(article)}
                        </pre>
                    </div>
                }
            </>
        </Main>
    )
}
