import React, {RefObject} from "react"
import Prism from "prismjs"
// Prism.manual = true

type Props = {
    code: string
    language: string
}

export class Code extends React.Component<Props> {
    ref: RefObject<HTMLElement>

    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidMount() {
        this.highlight()
    }

    componentDidUpdate() {
        this.highlight()
    }

    highlight = () => {
        if (this.ref && this.ref.current) {
            Prism.highlightElement(this.ref.current)
        }
    }
    html(){
        const {code, language} = this.props
        const languageL = language.toLowerCase()
        const prismLanguage = Prism.languages[languageL] || Prism.languages.javascript
        return Prism.highlight(code, prismLanguage, language)
    }

    render() {
        const {code,language} = this.props
        const plugins = ['line-numbers']
        return (
            <pre className={`notion-code ${plugins.join(" ")}`}>
        <code
            ref={this.ref}
            className={`language-${language}`}
        >
            {code}
        </code>
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
