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
            <Main>
                {
                    articles.map(e => <ArticleHead head={e}/>)
                }

            </Main>

        </>
    )

}
