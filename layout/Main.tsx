import * as React from 'react'
import Head from 'flareact/head'

import {Layout} from 'antd'
const {Header, Content, Sider} = Layout
import Footer from './Footer'
import 'antd/dist/antd.css'
import mainStyle from './Main.module.scss'

class Main extends React.Component {
    render() {
        const {children} = this.props
        return (
            <Layout className={mainStyle.baseLayout}>
                <Head
                    defer={false}
                >
                    <style type="text/css">
                        {(mainStyle as any)._getCss && (mainStyle as any)._getCss()}
                    </style>
                </Head>
                <div className={mainStyle.headerWrapper}>
                    <div className={mainStyle.header}>
                        <div>
                            <ul>
                                <li className={mainStyle.active}><a href="/">首页</a></li>
                                <li><a>Golang</a></li>
                                <li><a>关于</a></li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><a><i className="fab fa-twitter" /></a></li>
                                <li><a><i className="fab fa-github" /></a></li>
                                <li><a><i className="fa fa-rss" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={mainStyle.mainWrapper}>
                    <Layout className={mainStyle.main}>
                        <Content className={mainStyle.contentWrapper}>
                            <div className={mainStyle.logoWrapper}>
                                <a className={mainStyle.logo} title="HaoIO"
                                   href="/" rel="home">
                                    <img
                                        src="/HaoIO.png"
                                        srcSet={`/HaoIO.png 1x, /HaoIO@2x.png 2x`}
                                        className="site_logo"
                                        alt="HaoIO" />
                                </a>
                            </div>
                            <div>
                                {children}
                            </div>
                        </Content>
                        <Sider
                            className={mainStyle.side}
                            width={300}
                            breakpoint="lg"
                            collapsedWidth={0}
                        >
                            <div className="about">
                                <h4>
                                    关于我
                                </h4>
                                <img src="/avatar.png"/>
                                <p>
                                    嗨，你好。 欢迎你到我的小站。 我叫Senghoo，是一名码农，目前攻读博士学位。工作之余喜欢折腾各种新鲜玩意。 联系请发送邮件到me@senghoo.com
                                </p>
                            </div>
                        </Sider>
                    </Layout>
                </div>
                <div className={mainStyle.footerWrap}>
                    <Footer/>
                </div>
            </Layout>
    )
    }
    }

    export default Main
