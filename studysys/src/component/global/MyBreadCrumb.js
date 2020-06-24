import React from "react";
import { Breadcrumb } from "antd";
import styled from "styled-components";

const Styled_Breadcrumb = styled(Breadcrumb)`
  &&& {
    margin: 16px 0;
  }
`;

function MyBreadCrumb(props) {
  const { locationString } = props;
  return (
    <Styled_Breadcrumb>
      <Breadcrumb.Item>
        <a>Admin</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{`${locationString}`}</Breadcrumb.Item>
    </Styled_Breadcrumb>
  );
}

export default MyBreadCrumb;
