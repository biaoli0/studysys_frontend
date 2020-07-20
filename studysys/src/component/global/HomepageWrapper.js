import React, { useState } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { useRouter } from "next/router";
import { api } from "../../library/axios/Api";
import { Log } from "../../library/Log";
import MyBreadCrumb from "./MyBreadCrumb";
import LeftMenu from "./LeftMenu";
const { Header, Content, Sider } = Layout;

const Styled_Header = styled(Header)`
  &&& {
    height: 68px;
  }
`;
const Styled_Div = styled.div`
  &&& {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 24px;
    float: left;
    text-align: center;
  }
`;

const Styled_Img = styled.img`
  &&& {
    height: 31px;
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
        <Styled_Div>
          <Styled_Img src="/logo.png" />
        </Styled_Div>
        <LeftMenu location={location} locationString={locationString} />
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
          <MyBreadCrumb locationString={locationString} />
          {children}
        </Styled_Content>
      </Layout>
    </Layout>
  );
}
