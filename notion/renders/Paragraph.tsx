import {ParagraphBlock} from '@notionhq/client/build/src/api-types'
import RichText from './RichText'

export default function paragraph({block}:{block: ParagraphBlock}){
    return (<div>
        <RichText text={block.paragraph.text} />
    </div>)
}
