import {HeadingOneBlock, ParagraphBlock} from '@notionhq/client/build/src/api-types'
import RichText from './RichText'

export default function heading_1({block}: { block: HeadingOneBlock }) {
    return (<div>
        <h2>
            <RichText text={block.heading_1.text} />
        </h2>
    </div>)
}
