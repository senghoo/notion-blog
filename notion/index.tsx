import {Block} from '@notionhq/client/build/src/api-types'
import * as renders from './renders'


export function RenderBlock({block}:{block:Block}){
    return <div>
        {renders[block.type] ? renders[block.type]({block: block}): `unknown type ${block.type}` }
    </div>
}

export default function NotionRender({blocks}: {blocks:Block[]}) {
    return <div>
        {blocks.map(block=><RenderBlock block={block} key={block.id} />)}
    </div>
}
