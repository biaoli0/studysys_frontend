import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { ColumnsConfig } from "../../../../config/course/CourseListConfig";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SearchBar from "../../../../component/global/SearchBar";

export default function CourseList() {
  const [originData, setOriginData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const searchBarTarget = "type_name";

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
      <SearchBar
        originData={originData}
        setDisplayData={setDisplayData}
        searchBarTarget={searchBarTarget}
      />

      <Table {...state} columns={ColumnsConfig} dataSource={displayData} />
    </HomepageWrapper>
  );
}