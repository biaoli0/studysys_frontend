import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { ColumnsConfig } from "../../../../config/course/course_list_config";
import { api } from "../../../../library/axios/api";
import HomepageWrapper from "../../../../component/global/homepage_wrapper";
import SearchBar from "../../../../component/global/search_bar";
import { DisplayDataContext } from "../../../../config/global/context_config";

export default function CourseList() {
  const [displayData, setDisplayData] = useState(null);
  const [originData, setOriginData] = useState(null);

  useEffect(() => {
    let fetchData;
    api.getCourseList().then((res) => {
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
    <HomepageWrapper>
      <DisplayDataContext.Provider value={{ setDisplayData, originData }}>
        <SearchBar />
      </DisplayDataContext.Provider>

      <Table {...state} columns={ColumnsConfig} dataSource={displayData} />
    </HomepageWrapper>
  );
}
