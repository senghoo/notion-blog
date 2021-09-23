import {HeadingOneBlock, HeadingTwoBlock, ParagraphBlock} from '@notionhq/client/build/src/api-types'
import RichText from './RichText'

export default function heading_2({block}: { block: HeadingTwoBlock }) {
    return (<div>
        <h2>
            <RichText text={block.heading_2.text} />
        </h2>
    </div>)
}
