import {ToDoBlock} from '@notionhq/client/build/src/api-types'
import { Checkbox } from 'antd';

export default function paragraph({block}:{block: ToDoBlock}){
    return (<div>
        <Checkbox checked={block.to_do.checked}>
            {block.to_do.text.map(text=>(
                    <span>
                {text.plain_text}
            </span>
                )
            )}
        </Checkbox>
    </div>)
}
