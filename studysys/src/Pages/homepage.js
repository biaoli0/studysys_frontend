import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import {
  ReadOutlined,
  SolutionOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./homepage.css";
import { Link, Route, Switch } from "react-router-dom";
import {
  homeRoutes,
  studentRoutes,
  classRoutes,
  interviewRoutes,
  teacherRoutes,
  routes,
} from "./routeConfig";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const renderMenuItemWithRoutes = (menuItems) => {
  return menuItems.map((menuItem) => (
    <Menu.Item>
      <Link to={menuItem.path}>
        <menuItem.icon />
        <span>{menuItem.title}</span>
      </Link>
    </Menu.Item>
  ));
};

function Homepage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {renderMenuItemWithRoutes(homeRoutes)}
          <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                <span>学生管理</span>
              </span>
            }
          >
            {renderMenuItemWithRoutes(studentRoutes.menuItems)}
          </SubMenu>

          <SubMenu
            key="sub2"
            title={
              <span>
                <ReadOutlined />
                <span>课程管理</span>
              </span>
            }
          >
            {renderMenuItemWithRoutes(classRoutes.menuItems)}
          </SubMenu>

          <SubMenu
            key="sub3"
            title={
              <span>
                <SolutionOutlined />
                <span>面试管理</span>
              </span>
            }
          >
            {renderMenuItemWithRoutes(interviewRoutes.menuItems)}
          </SubMenu>

          <SubMenu
            key="sub4"
            title={
              <span>
                <TeamOutlined />
                <span>教师管理</span>
              </span>
            }
          >
            {renderMenuItemWithRoutes(teacherRoutes.menuItems)}
          </SubMenu>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ height: "68px" }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.component />}
                />
              ))}
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Homepage;
