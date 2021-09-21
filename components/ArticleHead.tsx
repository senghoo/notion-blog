import {IArticleHead} from '../api/article'
import * as moment from 'moment/moment'
import './ArticleHead.scss'

interface props {
    head: IArticleHead
}

export default function ArticleHead(props: props) {
    const publishAt = moment(props.head.PublishAt)
    const title = props.head.Title
    return (
        <div className="article-head">
            <h1><a href={`/${publishAt.format('YYYY')}/${publishAt.format('MM')}/${title}`}>{title}</a></h1>
            <div className="meta">
                <span>In: <a>{props.head.Category}</a></span>
                <span>Tags: {props.head.Tags.map(e=><a key={e}>e</a>)}</span>
                <span>Published: <a>{publishAt.format('L')}</a></span>
            </div>
        </div>
    )
}
