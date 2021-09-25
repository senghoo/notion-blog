import {NotionRenderer} from 'react-notion-x'
import {ExtendedRecordMap} from 'notion-types'
import {Code} from '../notion/renders/Code'
import {Checkbox} from '../notion/renders/Checkbox'
import {Collection} from '../notion/renders/Collection'
import {Equation} from '../notion/renders/Equation'
import * as types from 'notion-types'


export default function ArticleHead(props: {recordMap:ExtendedRecordMap}) {
    return <NotionRenderer
        recordMap={props.recordMap}
        components={{
            code: Code,
            equation: Equation,
            collection: Collection,
            checkbox: Checkbox
        }}

        fullPage={false}
        darkMode={false}/>
}

