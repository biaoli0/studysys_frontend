import React, { useState, useEffect } from "react";
import { Table, Row, Col } from "antd";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SearchBar from "../../../../component/global/SearchBar";
import MyTimeAgo from "../../../../library/MyTimeAgo";
import { Log } from "../../../../library/Log";
import styled from "styled-components";
import { ColumnsConfig } from "../../../../config/student/StudentListConfig";

const Styled_Row = styled(Row)`
  &&& {
    margin-bottom: 6px;
  }
`;

function StudentList() {
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
      current: pagination.current - 1,
      pagesize: pagination.pageSize,
      kw: searchKeyword,
    };
    api.getStudentList(params).then((res) => {
      if (res && res.hasOwnProperty("datas")) {
        newData = res.datas.map((item, key) => ({
          ...item,
          key: key,
          join_time: <MyTimeAgo ctime={item["ctime"]} />,
        }));
        if (res.pager.rowcount !== pagination.total)
          setPagination({ ...pagination, total: res.pager.rowcount });
        Log.print(newData);
        setOriginData(newData);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [pagination]);

  useEffect(() => {
    setPagination({ ...pagination, current: 1 });
  }, [searchKeyword]);

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
      <Styled_Row>
        <Col>
          <SearchBar onChange={onChange} />
        </Col>
      </Styled_Row>

      <Table
        {...state}
        columns={ColumnsConfig(fetchData)}
        dataSource={originData}
        onChange={(pagination, filters, sorter) => {
          setPagination(pagination);
        }}
      />
    </HomepageWrapper>
  );
}

export default StudentList;
