import React, { useState, useEffect } from "react";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import { Calendar, Col, Menu, message, Row, Table, Tabs } from "antd";
import { ColumnsConfig } from "../../../../config/student/StudentSelectionConfig";
import { SelectCourseModalDialog } from "../../../../component/student/selection/list_mode/SelectCourseModalDialog";
import SearchBar from "../../../../component/global/SearchBar";
import styled from "styled-components";
import SelectionCalendar from "../../../../component/student/selection/calendar_mode/SelectionCalendar";
import Kit from "../../../../library/Kit";

const { TabPane } = Tabs;

const Styled_Row = styled(Row)`
  &&& {
    margin-bottom: 6px;
  }
`;

export default function SelectionAdd() {
  const [list, setList] = useState(null);
  const [displayList, setDisplayList] = useState(null);
  const searchBarTarget = "student_name";

  const fetchData = () => {
    api.getStudentCourseList().then((res) => {
      if (res) {
        const data = res.map((item, key) => ({
          ...item,
          key: key,
          course_date: item.hasOwnProperty("course_date")
            ? Kit.dateConvert(item["course_date"])
            : "",
        }));
        setList(data);
        setDisplayList(data);
      }
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
          <SelectCourseModalDialog fetchData={fetchData}/>
        </Col>
        <Col>
          <SearchBar
            originData={list}
            setDisplayData={setDisplayList}
            searchBarTarget={searchBarTarget}
          />
        </Col>
      </Styled_Row>
      <Tabs defaultActiveKey="1">
        <TabPane tab="List Mode" key="1">
          <Table {...state} columns={ColumnsConfig} dataSource={displayList} />
        </TabPane>
        <TabPane tab="Calendar Mode" key="2">
          <SelectionCalendar />
        </TabPane>
      </Tabs>
    </HomepageWrapper>
  );
}
