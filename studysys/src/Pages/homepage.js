import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "../public/css/pages/teacher/homepage.css";
import { Link, Route, Switch } from "react-router-dom";
import {
  homeRoutes,
  studentRoutes,
  classRoutes,
  interviewRoutes,
  teacherRoutes,
  routes,
} from "./route/routeConfig";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const renderMenu = (menu) => {
  return (
    <SubMenu
      key={menu.key}
      title={
        <span>
          <menu.icon />
          <span>{menu.title}</span>
        </span>
      }
    >
      {renderMenuItems(menu.menuItems)}
    </SubMenu>
  );
};

const renderMenuItems = (menuItems) => {
  return menuItems.map((menuItem) => (
    <Menu.Item key={menuItem.key}>
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
          {renderMenuItems(homeRoutes)}
          {renderMenu(studentRoutes)}
          {renderMenu(classRoutes)}
          {renderMenu(interviewRoutes)}
          {renderMenu(teacherRoutes)}
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ height: "68px" }} />
        <Content style={{ margin: "0 16px" }}>
          {/*TODO: navigation*/}
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ padding: 24, background: "#fff", minHeight: 600 }}>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.key}
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
