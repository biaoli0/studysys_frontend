import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import {Table, Row, Col, Space} from "antd";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import styled from "styled-components";
import LineChart from "../../../../component/home/LineChart";
import PieChart from "../../../../component/home/PieChart";

const Styled_Row = styled(Row)`
  &&& {
    margin-bottom: 6px;
  }
`;

export default function Dashboard() {
  return (
    <HomepageWrapper>
        <Space direction="horizontal" size="large">
            <LineChart/>
            <PieChart/>
        </Space>

    </HomepageWrapper>
  );
}
