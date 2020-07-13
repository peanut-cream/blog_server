import React, { useState, useEffect } from 'react'
// import { withRouter } from 'next/router'
import Head from 'next/head';
import { Row, Col, Input } from "antd";
const { TextArea } = Input;
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
import "../less/EditPage.less"
import axios from "axios"
// 笔记备注：MarkNav中对markdown解析的时候会丢失第一个锚点
let EditPage = (list) => { 
    const renderer = new marked.Renderer();
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
    const [articleContent,setArticleContent] = useState("");
    let markdownContent = marked(articleContent)
    let changeContent = (e) => { 
        console.log(JSON.stringify(e.target.value))
        setArticleContent(e.target.value);
    }
    return (
        <>
            <Head>
                <title>详情页</title>
            </Head>
            <Header></Header>
            <Row className="comm-main" type="flex" justify="space-around">
                <Col className="comm-left" xs={11} sm={11} md={11} lg={11} xl={11}  >
                    {/* 左侧 */}
                    <TextArea value={articleContent} 
                        className="markdown-content" 
                        rows={35}  
                        onChange={changeContent} 
                        onPressEnter={changeContent}
                        placeholder="文章内容">

                    </TextArea>
                </Col>

                <Col className="comm-right" xs={11} sm={11} md={11} lg={11} xl={11}>
                    <div 
                        className="show-html"
                        dangerouslySetInnerHTML = {{__html:markdownContent}} >

                    </div>
                </Col>
            </Row>
        </>
    )
}
// EditPage.getInitialProps = async (context) => { 
//     let id = context.query.id;
//     return await new Promise((resolve,reject) => { 
//         axios.get('http://localhost:4321/api/list?id='+id).then(
//             (res) => {
//                 resolve(res.data)
//             }).catch(() => { reject()})
//     })
// }
export default (EditPage);