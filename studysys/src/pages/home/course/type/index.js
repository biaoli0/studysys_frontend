import React, { useState, useEffect } from "react";
import { Button, Row, Col, Table } from "antd";
import { CourseTypeListColumnsConfig } from "../../../../config/course/CourseTypeListConfig";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SearchBar from "../../../../component/global/SearchBar";
import { Log } from "../../../../library/Log";
import AddCourseTypeModalDialog from "../../../../component/course/AddCourseTypeModalDialog";
import styled from "styled-components";

const Styled_Row = styled(Row)`
  &&& {
    margin-bottom: 6px;
  }
`;

export default function CourseType() {
  const [originData, setOriginData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const searchBarTarget = "name";

  const fetchData = () => {
    let newData;
    api.getCourseTypeList().then((res) => {
      Log.print(res);
      if (res) {
        newData = res.map((item, key) => ({
          ...item,
          key: key,
        }));
      } else newData = null;
      setDisplayData(newData);
      setOriginData(newData);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const state = {
    bordered: false,
    loading: false,
    pagination: { position: "bottom" },
    size: "default",
    title: undefined,
    showHeader: true,
    tableLayout: undefined,
    bottom: "bottomRight",
    scroll: { y: 400 },
  };

  return (
    <HomepageWrapper>
      <Styled_Row gutter={8}>
        <Col>
          <AddCourseTypeModalDialog fetchData={fetchData}/>
        </Col>
        <Col>
          <SearchBar
            originData={originData}
            setDisplayData={setDisplayData}
            searchBarTarget={searchBarTarget}
          />
        </Col>
      </Styled_Row>

      <Table
        {...state}
        columns={CourseTypeListColumnsConfig(fetchData)}
        dataSource={displayData}
      />
    </HomepageWrapper>
  );
}
