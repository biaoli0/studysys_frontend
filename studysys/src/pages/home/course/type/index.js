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
  const [loading, setLoading] = useState(true);
  const [originData, setOriginData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    position: "bottom",
    showSizeChanger: true,
    total: 400,
  });

  const fetchData = (page) => {
    let newData;
    setLoading(true);
    const params = {
      page: page.current-1,
      pagesize:page.pageSize,
      kw:searchKeyword,
    }
    api.getCourseTypeList(params).then((res) => {
      Log.print(res);
      if (res) {
        newData = res.map((item, key) => ({
          ...item,
          key: key,
        }));
      } else newData = null;
      setOriginData(newData);
      setLoading(false);

    });
  };

  useEffect(() => {
    fetchData(pagination);
  }, [searchKeyword]);

  const onChange =(keyword)=>{
    setSearchKeyword(keyword);
  }

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
          <AddCourseTypeModalDialog fetchData={fetchData}/>
        </Col>
        <Col>
          <SearchBar
            onChange={onChange}
          />
        </Col>
      </Styled_Row>

      <Table
        {...state}
        columns={CourseTypeListColumnsConfig(fetchData)}
        dataSource={originData}
        onChange={(pagination, filters, sorter) => {
          fetchData(pagination);
        }}
      />
    </HomepageWrapper>
  );
}
