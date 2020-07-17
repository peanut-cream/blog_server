import React, { useState, useEffect } from 'react'
import { Row, Col, Input,Select,Button ,DatePicker } from "antd";

// import { CalendarOutlined,FireOutlined,FormOutlined } from "@ant-design/icons"
import marked from 'marked'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import 'highlight.js/styles/monokai-sublime.css';
// import MarkNav from 'markdown-navbar';
// import 'markdown-navbar/dist/navbar.css';
import axios from "axios"
import "../less/Addarcle.less"
const { TextArea } = Input;
const { Option } = Select ;
hljs.registerLanguage('javascript', javascript);
// 笔记备注：MarkNav中对markdown解析的时候会丢失第一个锚点
let Addarcle = (list) => { 
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
    const [height,setheight] = useState(getHeight());
    const [des,setdes] = useState("");
    const [time,setTime] = useState("");
    let markdownContent = marked(articleContent)
    let DesContent = marked(des)
    let changeContent = (e) => { 
        console.log(JSON.stringify(e.target.value))
        setArticleContent(e.target.value);
    }
    let handleChange = (value) => { 
        console.log(`selected ${value}`);
    }
    function getHeight() { 
        return document.documentElement.offsetHeight-94-32-30-40
    }
    function changeDesContent(e) { 
        setdes(e.target.value)
    }
    useEffect(() => { 
        window.onresize = () => { 
            setheight(getHeight());
        }
    },[])
    return (
        <>
            <Row className="comm-main" type="flex" justify="space-around" gutter={5}>
                <Col className="comm-left" span={ 18 } >
                    <div className="title_line">
                        <Input placeholder="请输入标题" />
                        <Select defaultValue="1" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="1">前端随笔</Option>
                            <Option value="2">日常生活</Option>
                        </Select>
                    </div>
                    <Row gutter={5}>
                        <Col span={12}>
                            <TextArea value={articleContent} 
                                className="markdown-content" 
                                autoSize={false}
                                style={{height:height,resize:"none"}}
                                onChange={changeContent} 
                                onPressEnter={changeContent}
                                placeholder="文章内容（markdown）">

                            </TextArea>
                        </Col>
                        <Col span={12}>
                            <div 
                                className="show-html"
                                style={{height:height}}
                                dangerouslySetInnerHTML = {{__html:markdownContent}} >

                            </div>
                        </Col>
                    </Row>
                    
                </Col>

                <Col className="comm-right" span={ 6 }>
                    <div className="btn_line">
                        <Button  size="middle">暂存文章</Button>
                        <Button type="primary" >发布文章</Button>
                    </div>
                    <TextArea
                        value={des}
                        placeholder="文章介绍"
                        autoSize={{ minRows: 4 }}
                        onChange={changeDesContent} 
                        onPressEnter={changeDesContent}
                        >
                    </TextArea>
                    <div>
                        <div 
                            className="show-html"
                            style={{height:100}}
                            dangerouslySetInnerHTML = {{__html:DesContent}} >
                        </div>
                    </div>
                    <div className="timepick">
                        <DatePicker showTime defaultValue={time} placeholder="选择发布日期"></DatePicker>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default (Addarcle);