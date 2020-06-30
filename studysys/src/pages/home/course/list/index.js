import React, { useState, useEffect } from "react";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SearchBar from "../../../../component/global/SearchBar";
import EditableTable from "../../../../component/global/EditableTable";
import {
  editableCell,
  editDataIndex,
  columnsSetting,
} from "../../../../config/course/CourseListConfig";
import MyTimeAgo from "../../../../library/MyTimeAgo";

export default function CourseList() {
  const [originData, setOriginData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const searchBarTarget = "type_name";

  const fetchData = () => {
    let newData;
    api.getCourseList().then((res) => {
      if (res) {
        newData = res.map((item, key) => ({
          ...item,
          key: key,
          join_time: <MyTimeAgo ctime={item["ctime"]} />,
        }));
      } else newData = null;
      setDisplayData(newData);
      setOriginData(newData);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HomepageWrapper>
      <SearchBar
        originData={originData}
        setDisplayData={setDisplayData}
        searchBarTarget={searchBarTarget}
      />

      <EditableTable
        fetchData={fetchData}
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
