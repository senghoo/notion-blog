import React, {RefObject} from "react"
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night-bright.css'

const BREAK_LINE_REGEXP = /\r\n|\r|\n/g

type Props = {
    code: string
    language: string
}

export class Code extends React.Component<Props> {
    ref: RefObject<HTMLElement>

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    html() {
        const {code, language} = this.props
        const hl = hljs.highlight(code, {
            language: language === 'plain text' ? '': language.toLowerCase(),
            ignoreIllegals: true,
        })
        const lines = this.getLines(hl.value)

        return lines.map((line, idx) => {
            return <span
                className="line"
                dangerouslySetInnerHTML={{__html: line + "\n"}}
                key={idx}
            />
        })

    }

    getLines(text) {
        if (text.length === 0) return []
        return text.split(BREAK_LINE_REGEXP)
    }

    render() {
        const {code, language} = this.props
        const isWorker = (typeof document) === 'undefined'

        return (
            <pre className={`notion-code`}>
                <code
                    ref={this.ref}
                >{this.html()}</code>
      </pre>
        )
    }
}

// import {highlight, languages} from 'prismjs'
//
//
// export const Code: React.FC<{ code: string; language: string }> = (
//     {
//         code,
//         language = 'javascript'
//     }) => {
//     const languageL = language.toLowerCase()
//     const prismLanguage = languages[languageL] || languages.javascript
//     const html = highlight(code, prismLanguage, language)
//
//     return (
//         <pre className={`notion-code language-${languageL} line-numbers`}>
//             <code className={`language-${languageL}`}
//                  dangerouslySetInnerHTML={{__html: html}}/>
//     </pre>
//     )
// }
//
