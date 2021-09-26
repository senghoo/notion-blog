import {Component, createContext, useContext} from 'react'
import {htmlEscapeJsonString} from "flareact/src/utils";

import mainStyle from '../layout/Main.module.scss'

const DocumentContext = createContext(undefined);

const dev = typeof DEV !== "undefined" && !!DEV;


export default class MyDocument extends Component {
    static async getEdgeProps(ctx) {
        const enhanceApp = (App) => (props) => <App {...props} />;

        const {html} = await ctx.renderPage({enhanceApp});

        return {html};
    }

    static renderDocument(DocumentComponent, props) {
        return (
            <DocumentContext.Provider value={props}>
                <DocumentComponent {...props} />
            </DocumentContext.Provider>
        );
    }

    render() {
        return (
            <Html>
                <Head/>
                <body>
                <Main/>
                <FlareactScript/>
                </body>
            </Html>
        );
    }
}

export function Head() {
    const {helmet, currentPage, buildManifest, styles} = useContext(
        DocumentContext
    );

    let links = new Set<string>();

    if (!dev) {
        buildManifest.pages["/_app"]
            .filter((link) => link.endsWith(".css"))
            .forEach((link) => links.add(link));
        buildManifest.pages[currentPage]
            .filter((link) => link.endsWith(".css"))
            .forEach((link) => links.add(link));
    }

    return (
        <head>
            <meta name="viewport" content="width=device-width"/>
            <meta charSet="utf-8"/>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {helmet.script.toComponent()}
            {helmet.style.toComponent()}
            <style type="text/css">
                {(mainStyle as any)._getCss && (mainStyle as any)._getCss()}
            </style>
            {Array.from(links).map((link) => (
                <link key={link} href={`/_flareact/static/${link}`} rel="stylesheet"/>
            ))}
            {styles || null}
        </head>
    )
}

export function Html(props) {
    const {helmet} = useContext(DocumentContext);
    const {htmlAttributes} = helmet.htmlAttributes.toComponent();

    return <html {...htmlAttributes} {...props} />;
}

export function Main() {
    const {html} = useContext(DocumentContext);
    return <div id="__flareact" dangerouslySetInnerHTML={{__html: html}}/>;
}

export function FlareactScript() {
    const {buildManifest, page, currentPage, props} = useContext(
        DocumentContext
    );

    let prefix = dev ? "/" : "/_flareact/static/";

    let scripts = new Set<string>();

    if (dev) {
        [
            "webpack.js",
            "main.js",
            `pages/_app.js`,
            `pages${currentPage}.js`,
        ].forEach((script) => scripts.add(script));
    } else {
        buildManifest.helpers.forEach((script) => scripts.add(script));
        buildManifest.pages["/_app"]
            .filter((script) => script.endsWith(".js"))
            .forEach((script) => scripts.add(script));
        buildManifest.pages["/_document"]
            .filter((script) => script.endsWith(".js"))
            .forEach((script) => scripts.add(script));
        buildManifest.pages[currentPage]
            .filter((script) => script.endsWith(".js"))
            .forEach((script) => scripts.add(script));
    }

    const initialData = {page, props};

    return (
        <>
            <script
                id="__FLAREACT_DATA"
                type="application/json"
                dangerouslySetInnerHTML={{
                    __html: htmlEscapeJsonString(JSON.stringify(initialData)),
                }}
            />
            {Array.from(scripts).map((script) => (
                <script key={script} src={`${prefix}${script}`}/>
            ))}
        </>
    );
}
