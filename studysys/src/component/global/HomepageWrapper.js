import React, { useState } from "react";
import { Layout } from "antd";
import styled from "styled-components";

import { useRouter } from "next/router";
import { api } from "../../library/axios/Api";
import { Log } from "../../library/Log";
import MyBreadCrumb from "./MyBreadCrumb";
import LeftMenu from "./LeftMenu";
import {LeftMenuConfig} from "../../config/global/HomeLeftBarConfig";
const { Header, Content, Sider } = Layout;

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
const Logout = styled.a`
  &&& {
    float: right;
  }
`;

export default function HomepageWrapper({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const location = router.pathname.split("/");
  const locationString = location[2] + " " + location[3];
  Log.print(locationString);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <LeftMenu location={location} locationString={locationString} homeLeftBarConfig={LeftMenuConfig}/>
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
          <MyBreadCrumb locationString={locationString}/>
          {children}
        </Styled_Content>
      </Layout>
    </Layout>
  );
}
