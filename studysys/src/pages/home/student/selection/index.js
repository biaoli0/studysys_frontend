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
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(null);
  const [displayList, setDisplayList] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    position: "bottom",
    showSizeChanger: true,
    total: 400,
  });
  const searchBarTarget = "student_name";

  const fetchData = async (page) => {
    console.log(page);
    setLoading(true);
    api
      .getStudentCourseListWithPage(page.current - 1, page.pageSize)
      .then((res) => {
        if (res && res.hasOwnProperty("datas")) {
          const data = res.datas.map((item, key) => ({
            ...item,
            key: key,
            course_date: item.hasOwnProperty("course_date")
              ? Kit.dateConvert(item["course_date"])
              : "",
          }));
          setPagination({ ...page, total: res.pager.rowcount });
          setList(data);
          setDisplayList(data);
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    fetchData(pagination);
  }, []);

  const state = {
    bordered: false,
    loading,
    pagination,
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
          <SelectCourseModalDialog fetchData={fetchData} />
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
          <Table
            {...state}
            columns={ColumnsConfig}
            dataSource={displayList}
            onChange={(pagination, filters, sorter) => {
              fetchData(pagination);
            }}
          />
        </TabPane>
        <TabPane tab="Calendar Mode" key="2">
          <SelectionCalendar />
        </TabPane>
      </Tabs>
    </HomepageWrapper>
  );
}
