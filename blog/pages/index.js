import React, { useState, useEffect } from 'react'
// import { withRouter } from 'next/router'
import Head from 'next/head';
import Link from 'next/link'
import { Row, Col ,List ,Icon} from "antd";
import Header from "../components/Header"
import Author from "../components/Author"
import Advert from "../components/Advert"
import { CalendarOutlined,FireOutlined,FolderViewOutlined } from "@ant-design/icons"
import "../less/index.less"
import axios from "axios"
let index= (list) => { 
    const [ mylist , setMylist ] = useState(list.data)
    useEffect(() => { 
        console.log(list.data);
    },[])
    return (
        <>
            <Head>
                <title>首页</title>
            </Head>
            <Header></Header>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    {/* 左侧 */}
                    <div>    
                        <List
                            header={<div>前端随笔</div>}
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                   
                                    <div className="list-title">
                                        <Link href={{ pathname: '/detail', query: { id: item.id } }} >
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><CalendarOutlined /> {item.createTime_at}</span>
                                        <span><FolderViewOutlined /> 笔记</span>
                                        <span><FireOutlined /> {item.hot}人</span>
                                    </div>
                                    <div className="list-context">{item.description}</div>  
                                    
                                </List.Item>
                            )}
                        />    
                        </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                </Col>
            </Row>
        </>
    )
}
index.getInitialProps = async () => { 
    return await new Promise((resolve,reject) => { 
        axios.get('http://localhost:4321/api/list').then(
            (res) => {
                resolve(res.data)
            }).catch(() => { reject()})
    })
}
export default (index);