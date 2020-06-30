import React, { useState, useEffect } from "react";
import { Table, Row, Col } from "antd";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SearchBar from "../../../../component/global/SearchBar";
import MyTimeAgo from "../../../../library/MyTimeAgo";
import StudentTypeListService from "../../../../library/StudentTypeListService";
import { Log } from "../../../../library/Log";
import styled from "styled-components";
import {ColumnsConfig} from "../../../../config/student/StudentListConfig";

const Styled_Row = styled(Row)`
  &&& {
    margin-bottom: 6px;
  }
`;

function StudentList() {
  const [originData, setOriginData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchBarTarget = "name";

  const fetchData = async () => {
    setLoading(true);
    let newData;
    StudentTypeListService.updateList().then((r) => {
      api.getStudentList().then((res) => {
        if (res) {
          newData = res.map((item, key) => ({
            ...item,
            key: key,
            join_time: <MyTimeAgo ctime={item["ctime"]} />,
            type_name: StudentTypeListService.findNameById(item["type_id"]),
          }));
          Log.print(newData);
          setDisplayData(newData);
          setOriginData(newData);
          setLoading(false);
        }
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const state = {
    bordered: false,
    loading,
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
      <Styled_Row>
        <Col>
          <SearchBar
            originData={originData}
            setDisplayData={setDisplayData}
            searchBarTarget={searchBarTarget}
          />
        </Col>
      </Styled_Row>

      <Table {...state} columns={ColumnsConfig(fetchData)} dataSource={displayData} />
    </HomepageWrapper>
  );
}

export default StudentList;
