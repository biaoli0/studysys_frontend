import React, { useState, useEffect } from "react";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SearchBar from "../../../../component/global/SearchBar";
import EditableTable from "../../../../component/global/EditableTable";
import {
  editableCell,
  editDataIndex,
  columnsSetting
} from "../../../../config/course/CourseListConfig";
import MyTimeAgo from "../../../../library/MyTimeAgo";

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
          join_time:<MyTimeAgo ctime = {item["ctime"]}/>,
        }));
      } else fetchData = null;
      setDisplayData(fetchData);
      setOriginData(fetchData);
    });
  }, []);

  return (
    <HomepageWrapper>
      <SearchBar
        originData={originData}
        setDisplayData={setDisplayData}
        searchBarTarget={searchBarTarget}
      />

      <EditableTable
        EditableCell={editableCell}
        originData={originData}
        setOriginData={setOriginData}
        displayData={displayData}
        setDisplayData={setDisplayData}
        editDataIndex={editDataIndex}
        columnsSetting={columnsSetting}
      />
    </HomepageWrapper>
  );
}
