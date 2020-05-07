import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { ReadOutlined, SolutionOutlined } from "@ant-design/icons";
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

const renderMenuItemWithRoutes = (routes) => {
  return routes.map((route) => (
    <Menu.Item>
      <Link to={route.path}>
        <span>{route.title}</span>
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
          {homeRoutes.map((route) => (
            <Menu.Item>
              <Link to={route.path}>
                <Icon type="pie-chart" />
                <span>{route.title}</span>
              </Link>
            </Menu.Item>
          ))}

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>学生管理</span>
              </span>
            }
          >
            {renderMenuItemWithRoutes(studentRoutes)}
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
            {renderMenuItemWithRoutes(classRoutes)}
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
            {renderMenuItemWithRoutes(interviewRoutes)}
          </SubMenu>

          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="team" />
                <span>教师管理</span>
              </span>
            }
          >
            {renderMenuItemWithRoutes(teacherRoutes)}
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
