import {HeadingOneBlock, HeadingTwoBlock, ParagraphBlock} from '@notionhq/client/build/src/api-types'
import RichText from './RichText'
import renderStyle from './render.module.scss'

export default function heading_2({block}: { block: HeadingTwoBlock }) {
    return (<div className={renderStyle.block}>
        <h3>
            <RichText text={block.heading_2.text} />
        </h3>
    </div>)
}
