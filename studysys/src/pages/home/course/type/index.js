import React, { useState, useEffect } from "react";
import {Button, Table} from "antd";
import { CourseTypeListColumnsConfig } from "../../../../config/course/CourseTypeListConfig";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SearchBar from "../../../../component/global/SearchBar";
import { Log } from "../../../../library/Log";
import AddCourseTypeModalDialog from "../../../../component/course/AddCourseTypeModalDialog";

export default function CourseType() {
  const [originData, setOriginData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const searchBarTarget = "name";

  useEffect(() => {
    let fetchData;
    api.getCourseTypeList().then((res) => {
      Log.print(res);
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

      <AddCourseTypeModalDialog/>
      <Table
        {...state}
        columns={CourseTypeListColumnsConfig}
        dataSource={displayData}
      />
    </HomepageWrapper>
  );
}
