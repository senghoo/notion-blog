import {HeadingOneBlock, HeadingThreeBlock, ParagraphBlock} from '@notionhq/client/build/src/api-types'
import RichText from './RichText'
import renderStyle from './render.module.scss'

export default function heading_3({block}: { block: HeadingThreeBlock }) {
    return (<div className={renderStyle.block}>
        <h4>
            <RichText text={block.heading_3.text} />
        </h4>
    </div>)
}
