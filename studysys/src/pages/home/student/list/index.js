import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { ColumnsConfig } from "../../../../config/student/StudentListConfig";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SearchBar from "../../../../component/global/SearchBar";
import MyTimeAgo from "../../../../library/MyTimeAgo";
import StudentTypeListService from "../../../../library/StudentTypeListService";
import {Log} from "../../../../library/Log";

function StudentList() {
  const [originData, setOriginData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const searchBarTarget = "student_name";

  useEffect(() => {
   let fetchData;
    api.getStudentList().then((res) => {
      if (res) {
        StudentTypeListService.updateList().then(r=>{
          fetchData = res.map((item, key) => ({
            ...item,
            key: key,
            join_time:<MyTimeAgo ctime = {item["ctime"]}/>,
            type_name: StudentTypeListService.findNameById(item["type_id"])
          }));
          Log.print(fetchData);
          setDisplayData(fetchData);
          setOriginData(fetchData);
        })

      }

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

export default StudentList;
