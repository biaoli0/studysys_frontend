import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import styled from "styled-components";
import {
  homeRoutes,
  studentRoutes,
  classRoutes,
  // interviewRoutes,
  // teacherRoutes,
  routes,
} from "../../route/routeConfig";

import Link from "next/link";
import { useRouter } from "next/router";
import ComponentRouter from "../route/componentRouter";

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
        href={`/${ROUTE_PATH}/[category]/[subcategory]`}
        as={`/${ROUTE_PATH}/${menuItem.category}/${menuItem.subcategory}`}
      >
        <a>
          <menuItem.icon />
          <span>{menuItem.title}</span>
        </a>
      </Link>
    </Menu.Item>
  ));
}

export default function Subcategory() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { category, subcategory } = router.query;
  const MyContent = ComponentRouter(category, subcategory);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {renderMenuItems(homeRoutes)}
          {renderMenu(studentRoutes)}
          {renderMenu(classRoutes)}
          {/*{renderMenu(interviewRoutes)}*/}
          {/*{renderMenu(teacherRoutes)}*/}
        </Menu>
      </Sider>

      <Layout>
<<<<<<< Updated upstream
        <Header style={{ height: "68px" }} />
        <Content style={{ margin: "0 16px" }}>
=======
        <Styled_Header>
          <Logout>logout</Logout>
        </Styled_Header>
        <Styled_Content>
>>>>>>> Stashed changes
          {/*TODO: navigation*/}
          <Styled_Breadcrumb>
            <Breadcrumb.Item>
              <a>Admin</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{`${category} ${subcategory}`}</Breadcrumb.Item>
          </Styled_Breadcrumb>

<<<<<<< Updated upstream
          <div style={{ padding: 24, background: "#fff", minHeight: 600 }}>
            <ComponentRouter category={category} subcategory={subcategory} />
          </div>
        </Content>
=======
          <ComponentRouter category={category} subcategory={subcategory} />
        </Styled_Content>
>>>>>>> Stashed changes
      </Layout>
    </Layout>
  );
}
