import {IArticleHead} from '../api/article'
import * as moment from 'moment/moment'
import './ArticleHead.scss'

interface props {
    head: IArticleHead
}

export default function ArticleHead(props: props) {
    return (
        <div className="article-head">
            <h1>{props.head.Title[0].plain_text}</h1>
            <div className="meta">
                <span>In: {props.head.Category}</span>
                <span>Tags: {props.head.Tags.join(", ")}</span>
                <span>Published: {moment(props.head.CreateAt).format('ll')}</span>
                <span>Updated: {moment(props.head.UpdateAt).format('ll')}</span>
            </div>
        </div>
    )
}
