import React, { useState, useEffect } from "react";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import { Col, Menu, message, Row, Table } from "antd";
import { ColumnsConfig } from "../../../../config/student/StudentSelectionConfig";
import { SelectCourseModalDialog } from "../../../../component/student/SelectCourseModalDialog";
import SearchBar from "../../../../component/global/SearchBar";
import styled from "styled-components";

const Styled_Row = styled(Row)`
  &&& {
    margin-bottom: 6px;
  }
`;

export default function StudentAdd() {
  const [current, setCurrent] = useState("list");
  const [list, setList] = useState(null);
  const [displayList, setDisplayList] = useState(null);
  const searchBarTarget = "student_name";

  useEffect(() => {
    api.getStudentCourseList().then((res) => {
      if (res) {
        const data = res.map((item, key) => ({
          ...item,
          key: key,
          course_date: item.hasOwnProperty("course_date")
            ? new Date(item["course_date"]).toLocaleDateString()
            : "",
        }));
        setList(data);
        setDisplayList(data);
      }
    });
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

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <HomepageWrapper>
      <Styled_Row gutter={8}>
        <Col>
          <SelectCourseModalDialog />
        </Col>
        <Col>
          <SearchBar
            originData={list}
            setDisplayData={setDisplayList}
            searchBarTarget={searchBarTarget}
          />
        </Col>
      </Styled_Row>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="list">List Mode</Menu.Item>
        <Menu.Item key="calendar">Calendar Mode</Menu.Item>
      </Menu>
      <Table {...state} columns={ColumnsConfig} dataSource={displayList} />
    </HomepageWrapper>
  );
}
