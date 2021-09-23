import {Block} from '@notionhq/client/build/src/api-types'
import * as renders from './renders'
import renderStyle from './renders/render.module.scss'
import Head from 'flareact/head'

export function RenderBlock({block}:{block:Block}){
    return <div>
        <Head
            defer={false}
        >
            <style type="text/css">
                {(renderStyle as any)._getCss && (renderStyle as any)._getCss()}
            </style>
        </Head>

        {renders[block.type] ? renders[block.type]({block: block}): `unknown type ${block.type}` }
    </div>
}

export default function NotionRender({blocks}: {blocks:Block[]}) {
    return <div>
        {blocks.map(block=><RenderBlock block={block} key={block.id} />)}
    </div>
}
