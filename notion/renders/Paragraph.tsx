import {ParagraphBlock} from '@notionhq/client/build/src/api-types'
import RichText from './RichText'
import renderStyle from './render.module.scss'

export default function paragraph({block}:{block: ParagraphBlock}){
    return (<div className={renderStyle.block}>
        <RichText text={block.paragraph.text} />
    </div>)
}
