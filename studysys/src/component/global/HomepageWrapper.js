import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import styled from "styled-components";
import {
  homeRoutes,
  studentRoutes,
  courseRoutes,
  // interviewRoutes,
  // teacherRoutes,
  routes,
} from "../../config/global/HomeLeftBarConfig";

import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../library/axios/Api";
import { Log } from "../../library/Log";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const ROUTE_PATH = "home";
const Styled_Header = styled(Header)`
  &&& {
    height: 68px;
  }
`;
const Styled_Content = styled(Content)`
  &&& {
    margin: 0 16px;
  }
`;
const Styled_Breadcrumb = styled(Breadcrumb)`
  &&& {
    margin: 16px 0;
  }
`;
const Logout = styled.a`
  &&& {
    float: right;
  }
`;
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

function renderMenuItems(menuItems) {
  return menuItems.map((menuItem) => (
    <Menu.Item key={menuItem.key}>
      <Link
        href={`/${ROUTE_PATH}/${menuItem.category}/${menuItem.subcategory}`}
      >
        <a>
          <menuItem.icon />
          <span>{menuItem.title}</span>
        </a>
      </Link>
    </Menu.Item>
  ));
}

export default function HomepageWrapper({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const location = router.pathname.split("/");
  Log.print(location);
  const locationString = location[2] + " " + location[3];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[locationString]} mode="inline" defaultOpenKeys={[location[2]]}>
          {renderMenuItems(homeRoutes)}
          {renderMenu(studentRoutes)}
          {renderMenu(courseRoutes)}
          {/*{renderMenu(interviewRoutes)}*/}
          {/*{renderMenu(teacherRoutes)}*/}
        </Menu>
      </Sider>

      <Layout>
        <Styled_Header>
          <Logout
            onclick={() => {
              api.logout();
            }}
          >
            logout
          </Logout>
        </Styled_Header>
        <Styled_Content>
          {/*TODO: navigation*/}
          <Styled_Breadcrumb>
            <Breadcrumb.Item>
              <a>Admin</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{`${locationString}`}</Breadcrumb.Item>
          </Styled_Breadcrumb>
          {children}
        </Styled_Content>
      </Layout>
    </Layout>
  );
}
