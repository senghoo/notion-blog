import {HeadingOneBlock, HeadingThreeBlock, ParagraphBlock} from '@notionhq/client/build/src/api-types'
import RichText from './RichText'

export default function heading_3({block}: { block: HeadingThreeBlock }) {
    return (<div>
        <h2>
            <RichText text={block.heading_3.text} />
        </h2>
    </div>)
}
