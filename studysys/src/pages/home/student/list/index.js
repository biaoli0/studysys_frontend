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
  const [displayData, setDisplayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    position: "bottom",
    showSizeChanger: true,
    total: 400,
  });
  const searchBarTarget = "name";

  const fetchData = async (page) => {
    setLoading(true);
    let newData;
    api.getStudentList(page.current - 1, page.pageSize).then((res) => {
      if (res && res.hasOwnProperty("datas")) {
        newData = res.datas.map((item, key) => ({
          ...item,
          key: key,
          join_time: <MyTimeAgo ctime={item["ctime"]} />,
        }));
        setPagination({ ...page, total: res.pager.rowcount });
        Log.print(newData);
        setDisplayData(newData);
        setOriginData(newData);
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
      <Styled_Row>
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
        columns={ColumnsConfig(fetchData)}
        dataSource={displayData}
        onChange={(pagination, filters, sorter) => {
          fetchData(pagination);
        }}
      />
    </HomepageWrapper>
  );
}

export default StudentList;
