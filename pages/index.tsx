import Head from 'flareact/head'
import Main from '../layout/Main'
import {fetchArticle} from '../api/article'
import '../styles/index.scss'
import ArticleHead from '../components/ArticleHead'

export async function getEdgeProps() {
    const articles = await fetchArticle()
    return {
        props: {
            articles
        }
    }
}

export default function Index({articles}) {
    return (
        <>
            <Head>
                <title>HaoIO - Thinking &amp; Writing</title>
            </Head>
            <Main>
                {
                    articles.map(e => <ArticleHead key={e.ID} head={e}/>)
                }

            </Main>

        </>
    )

}
