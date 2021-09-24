import {RichText} from '@notionhq/client/build/src/api-types'
import 'katex/dist/katex.min.css'
import {InlineMath, BlockMath} from 'react-katex'
import {ReactElement} from 'react'
import renderStyle from './render.module.scss'


function Text({text}: {text: RichText}){
    let component:ReactElement|string = text.plain_text
    if (text.annotations.bold) {
        component = <b>{component}</b>
    }
    if (text.annotations.italic) {
        component = <i>{component}</i>
    }
    if (text.annotations.strikethrough) {
        component = <s>{component}</s>
    }
    if (text.annotations.underline) {
        component = <u>{component}</u>
    }
    if (text.annotations.code) {
        component = <pre>{component}</pre>
    }
    if (text.href){
        return <a className={renderStyle.text} href={text.href}>{component}</a>
    }

    return <span className={renderStyle.text}>{component}</span>
}

export default function (props: { text: RichText[] }) {
    if (props.text.length === 1 && props.text[0].type === 'equation') {
        return <BlockMath math={props.text[0].plain_text}/>
    }
    return <>
        {
            props.text.map((rt, idx) => {
                switch (rt.type) {
                    case 'text':
                        return <Text key={idx} text={rt} />
                    case 'equation':
                        return <InlineMath key={idx} math={rt.plain_text}/>
                }
            })
        }
    </>
}
