import * as React from 'react'
import {Layout} from 'antd'

const {Header, Content, Footer, Sider} = Layout
import 'antd/dist/antd.css'
import './main.scss'
import logo from '../assets/HaoIO.png'
import logo2x from '../assets/HaoIO@2x.png'
import avatar from '../assets/avatar.png'

class Main extends React.Component {
    render() {
        const {children} = this.props
        return (
            <Layout className="base-layout">
                <div className="header-wrapper">
                    <div className="header">
                        <div className="main-nav">
                            <ul>
                                <li className="active"><a>首页</a></li>
                                <li><a>Golang</a></li>
                                <li><a>关于</a></li>
                            </ul>
                        </div>
                        <div className="header-icon">
                            <ul>
                                <li><a><i className="fab fa-twitter"></i></a></li>
                                <li><a><i className="fab fa-github"></i></a></li>
                                <li><a><i className="fa fa-rss"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="main-wrapper">
                    <Layout className="main">
                        <Content className="content-wrapper">
                            <div className="logo-wrapper">
                                <a className="logo" title="HaoIO"
                                   href="/" rel="home">
                                    <img
                                        src={logo}
                                        srcSet={`${logo} 1x, ${logo2x} 2x`}
                                        className="site_logo"
                                        alt="HaoIO" />
                                </a>
                            </div>
                            <div className="content">
                                {children}
                            </div>
                        </Content>
                        <Sider className="side" width={340}>
                            <div className="about">
                                <h4>
                                    关于我
                                </h4>
                                <img src={avatar}/>
                                <p>
                                    嗨，你好。 欢迎你到我的小站。 我叫Senghoo，是一名码农，目前攻读博士学位。工作之余喜欢折腾各种新鲜玩意。 联系请发送邮件到me@senghoo.com
                                </p>
                            </div>
                        </Sider>
                    </Layout>
                </div>
                <Footer className="footer">
                    除非另有说明，本站文章采用<a
                    rel="&quot;license&quot;" href="&quot;http://creativecommons.org/licenses/by-sa/4.0/&quot;">知识共享署名-相同方式共享
                    4.0 国际许可协议</a>进行许可。
                </Footer>
            </Layout>
    )
    }
    }

    export default Main
