import {RichText} from '@notionhq/client/build/src/api-types'
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex'

export default function (props: { text: RichText[] }) {
    return <>
        {props.text.map(rt => {
            switch (rt.type) {
                case 'text':
                    return <>{rt.plain_text}</>
                case 'equation':
                    return <InlineMath math={rt.plain_text}/>
            }
        })}
    </>
}
