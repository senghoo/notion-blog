import Document, {Html, Head, Main, FlareactScript} from "flareact/document"
import mainStyle from '../layout/Main.module.scss'

class MyDocument extends Document {
    static async getEdgeProps(ctx) {
        const props = await Document.getEdgeProps(ctx)
        return {...props}
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                <style type="text/css">
                    {(mainStyle as any)._getCss && (mainStyle as any)._getCss()}
                </style>
                <Main/>
                <FlareactScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
