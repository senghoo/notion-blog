import {Block} from '@notionhq/client/build/src/api-types'

interface IProps{
    blocks: Block[]
}
export default function NotionRender(props: IProps) {
    return <div>{props.blocks.length}</div>
}
