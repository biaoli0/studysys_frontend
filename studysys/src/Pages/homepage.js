import React, {useState} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { ReadOutlined, SolutionOutlined } from '@ant-design/icons';
import "./homepage.css"

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;


function Homepage(props) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight : '100vh' }}>
            <Sider collapsible collapsed={ collapsed } onCollapse={ setCollapsed }>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>首页</span>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="user" />
                                <span>学生管理</span>
                            </span>
                        }>
                        <Menu.Item key="3">学生列表</Menu.Item>
                        <Menu.Item key="4">新增学生</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                              <ReadOutlined />
                              <span>课程管理</span>
                           </span>
                        }>
                        <Menu.Item key="5">课程列表</Menu.Item>
                        <Menu.Item key="6">添加课程</Menu.Item>
                        <Menu.Item key="7">课程类型</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                              <SolutionOutlined />
                              <span>面试管理</span>
                           </span>
                        }>
                        <Menu.Item key="8">面试安排</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                              <Icon type="team" />
                              <span>教师管理</span>
                           </span>
                        }>
                        <Menu.Item key="9">教师列表</Menu.Item>
                        <Menu.Item key="10">添加教师</Menu.Item>
                    </SubMenu>

                </Menu>
            </Sider>

            <Layout>
                <Header style={{height: '68px' }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{props.message}</div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Homepage;