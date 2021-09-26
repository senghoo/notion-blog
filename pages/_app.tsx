import '@fortawesome/fontawesome-free/js/all.js'
import '../styles/index.scss'
import 'katex/dist/katex.min.css'
export default function App({Component, pageProps}) {
    console.log('App Started')
    return (
        <Component {...pageProps} />
    )
}
