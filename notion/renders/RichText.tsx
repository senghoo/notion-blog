import {RichText} from '@notionhq/client/build/src/api-types'
import 'katex/dist/katex.min.css'
import {InlineMath, BlockMath} from 'react-katex'

export default function (props: { text: RichText[] }) {
    if (props.text.length === 1 && props.text[0].type === 'equation') {
        return <BlockMath math={props.text[0].plain_text}/>
    }
    return <>
        {
            props.text.map((rt, idx) => {
                switch (rt.type) {
                    case 'text':
                        return <span key={idx}>{rt.plain_text}</span>
                    case 'equation':
                        return <InlineMath key={idx} math={rt.plain_text}/>
                }
            })
        }
    </>
}
