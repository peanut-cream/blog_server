import React, { useState, useEffect } from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Addarcle from "../components/Addarcle.js"
import "../less/AdminIndex.less"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex() { 
    const [collapsed, setcollapsed] = useState(false);
    let onCollapse = () => {
        setcollapsed(!collapsed);
    }
    return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        工作台
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />} >留言管理</Menu.Item>
                </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Addarcle></Addarcle>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
        </Layout>
    )
}
export default AdminIndex;