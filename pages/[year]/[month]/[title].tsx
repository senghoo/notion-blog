import Head from 'flareact/head'
import Main from '../../../layout/Main'
import {fetchArticle} from '../../../api/article'
import ArticleHead from '../../../components/ArticleHead'

export async function getEdgeProps({ params }) {
    const {year, month, title} = params
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
    const article = articles.length > 0 ? articles[0] : null
    return {
        props: {
            article,
            query
        },
        notFound: articles.length <= 0,
        revalidate: 0
    }
}
export default function title({article,query, notFound}) {
    return(
        <Main>
            <>
                {
                    notFound === false &&
                    <div>
                        <Head>
                            <title>{article.Title} - HaoIO</title>
                        </Head>
                        <ArticleHead head={article}/>
                        <h1>
                            hello paper
                        </h1>
                    </div>
                }
                {
                    notFound===true &&
                    <div>
                        文章不存在
                        <pre>
                            {JSON.stringify(query)}
                        </pre>
                        <pre>
                            {JSON.stringify(article)}
                        </pre>
                    </div>
                }
            </>
        </Main>
    )
}
