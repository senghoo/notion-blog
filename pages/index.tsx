import Head from 'flareact/head'
import Main from '../layout/Main'
import {fetchArticle} from '../api/article'
import '../styles/index.scss'
import ArticleHead from '../components/ArticleHead'
import indexStyle from './index.module.scss'
import mainStyle from '../layout/Main.module.scss'

export async function getEdgeProps() {

    const query = {
        "filter": {
            "property": "PublishAt",
            "date": {
                is_not_empty:true
            }
        }
    }
    const articles = await fetchArticle(query)
    return {
        props: {
            articles
        },
        revalidate: 0
    }
}

export default function Index({articles}) {
    return (
        <>
            <Head>
                <title>HaoIO - Thinking &amp; Writing</title>
                <style type="text/css">
                    {(indexStyle as any)._getCss && (indexStyle as any)._getCss()}
                </style>
            </Head>
            <Main>
                {
                    articles.map(e => <div className={indexStyle.article}>
                        <ArticleHead key={e.ID} head={e}/>
                    </div>)
                }

            </Main>

        </>
    )

}
