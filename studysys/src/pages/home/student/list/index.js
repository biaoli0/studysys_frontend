import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { ColumnsConfig } from "../../../../component/student/student_list_config";
import { api } from "../../../../library/axios/api";
import Homepage_wrapper from "../../../../component/global/homepage_wrapper";
import { Log } from "../../../../library/log";
import SearchBar from "../../../../component/global/search_bar";
import { DisplayDataContext } from "../../../../component/global/context_config";

function StudentList() {
  const [displayData, setDisplayData] = useState(null);
  const [originData, setOriginData] = useState(null);

  useEffect(() => {
    let fetchData;
    api.getStudentList().then((res) => {
      if (res) {
        fetchData = res.map((item, key) => ({
          ...item,
          key: key,
        }));
      } else fetchData = null;
      setDisplayData(fetchData);
      setOriginData(fetchData);
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

  return (
    <Homepage_wrapper>
      <DisplayDataContext.Provider value={{ setDisplayData, originData }}>
        <SearchBar />
      </DisplayDataContext.Provider>

      <Table {...state} columns={ColumnsConfig} dataSource={displayData} />
    </Homepage_wrapper>
  );
}

export default StudentList;
