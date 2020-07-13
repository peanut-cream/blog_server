import React, { useState, useEffect } from 'react'
// import { withRouter } from 'next/router'
import Head from 'next/head';
import { Row,Col,Breadcrumb ,Affix } from "antd";
import Header from "../components/Header"
import Author from "../components/Author"
import { CalendarOutlined,FireOutlined,FormOutlined } from "@ant-design/icons"
import marked from 'marked'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/monokai-sublime.css';
// import MarkNav from 'markdown-navbar';
// import 'markdown-navbar/dist/navbar.css';
import Tocify from '../components/tocify.tsx'
import "../less/ListPage.less"
import axios from "axios"
// 笔记备注：MarkNav中对markdown解析的时候会丢失第一个锚点
let ListPage = (list) => { 
    const renderer = new marked.Renderer();
    const tocify = new Tocify()
    renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    marked.setOptions({
        renderer: renderer,
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    }); 
    let str
    if (list.data.length <= 0) {
        str=""
    } else { 

        str= JSON.parse(list.data[0].context);
    }
    let markdown =str;
    let html = marked(markdown)
    return (
        <>
            <Head>
                <title>详情页</title>
            </Head>
            <Header></Header>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    {/* 左侧 */}
                    <Breadcrumb className="bread-Div">
                        <Breadcrumb.Item>
                            <a href="/">首页</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">日常随笔</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>本篇文章</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="artcle-title">    
                        <div className="title">
                            element Select组件封装 下拉框加上滚动加载
                        </div>
                        <div className="icon-list">
                            <span>
                                <CalendarOutlined /><span>2019-8-10</span>
                            </span>
                            <span>
                                <FormOutlined /><span>随笔</span>
                            </span>
                            <span>
                                <FireOutlined /><span>200人</span>
                            </span>
                            
                        </div>
                        <div className="content">
                            <div dangerouslySetInnerHTML = {{__html: marked(html, { renderer: renderer }, )}}></div>
                        </div>

                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Affix offsetTop={50}>
                        {/* <MarkNav
                            className="article-menu"
                            source={markdown}
                            headingTopOffset={0}
                            ordered={false}
                        /> */}
                        <div className="toc-list">
                            {tocify && tocify.render()}
                        </div>
                    </Affix>
                </Col>
            </Row>
        </>
    )
}
ListPage.getInitialProps = async (context) => { 
    let id = context.query.id;
    return await new Promise((resolve,reject) => { 
        axios.get('http://localhost:4321/api/list?id='+id).then(
            (res) => {
                resolve(res.data)
            }).catch(() => { reject()})
    })
}
export default (ListPage);