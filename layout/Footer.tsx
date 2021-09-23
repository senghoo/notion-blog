import mainStyle from './Main.module.scss'
import * as React from 'react'
import {Layout} from 'antd'
const { Footer} = Layout
export default function (){
    return <Footer className={mainStyle.footer}>
        <div className={mainStyle.copyright}>
            除非另有说明，本站文章采用<a
            rel="&quot;license&quot;" href="http://creativecommons.org/licenses/by-sa/4.0/">知识共享署名-相同方式共享
            4.0 国际许可协议</a>进行许可。
        </div>
        <div className={mainStyle.marks}>
            <div className={mainStyle.fork}>
                <span>Fork me on</span>
                <a href="https://github.com/senghoo/notion-blog"><img src="/github-2.svg"/></a>
            </div>
            <div className={mainStyle.poweredBy}>
                <span>Powered By</span>
                <div>
                    <a href="https://www.notion.so/"><img src="/notion.svg"/></a>
                    <a href="https://workers.cloudflare.com/"><img src="/cfworkers.svg"/></a>
                </div>
            </div>
        </div>

    </Footer>
}
