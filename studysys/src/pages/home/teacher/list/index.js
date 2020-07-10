import React, { useState, useEffect } from "react";
import { Table, Row, Col } from "antd";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SearchBar from "../../../../component/global/SearchBar";
import { Log } from "../../../../library/Log";
import styled from "styled-components";
import { ColumnsConfig } from "../../../../config/teacher/TeacherListConfig";
import { AddTeacherModalDialog } from "../../../../component/teacher/AddTeacherModalDialog";

const Styled_Row = styled(Row)`
  &&& {
    margin-bottom: 6px;
  }
`;

function TeacherList() {
  const [originData, setOriginData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    position: "bottom",
    showSizeChanger: true,
    total: 400,
  });

  const fetchData = async () => {
    setLoading(true);
    let newData;
    const params = {
      page: pagination.current - 1,
      pagesize: pagination.pageSize,
      kw: searchKeyword,
    };

    api.getTeacherList(params).then((res) => {
      if (res && res.hasOwnProperty("datas")) {
        newData = res.datas.map((item, key) => ({
          ...item,
          key: key,
        }));
        if (res.pager.rowcount !== pagination.total) {
          setPagination({ ...pagination, total: res.pager.rowcount });
        }
        Log.print(newData);
        setOriginData(newData);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [searchKeyword, pagination]);

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

  const onChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <HomepageWrapper>
      <Styled_Row gutter={8}>
        <Col>
          <AddTeacherModalDialog fetchData={fetchData} />
        </Col>
        <Col>
          <SearchBar onChange={onChange} />
        </Col>
      </Styled_Row>

      <Table
        {...state}
        columns={ColumnsConfig(fetchData)}
        dataSource={originData}
        onChange={(page, filters, sorter) => {
          setPagination({ ...pagination, ...page });
        }}
      />
    </HomepageWrapper>
  );
}

export default TeacherList;
