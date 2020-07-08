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
  const [loading, setLoading] = useState(true);
  const [originData, setOriginData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    position: "bottom",
    showSizeChanger: true,
    total: 400,
  });
  const searchBarTarget = "type_name";

  const fetchData = async (page) => {
    setLoading(true);
    let newData;
    api.getCourseList(page.current - 1, page.pageSize).then((res) => {
      if (res && res.hasOwnProperty("datas")) {
        newData = res.datas.map((item, key) => ({
          ...item,
          key: key,
          join_time: <MyTimeAgo ctime={item["ctime"]} />,
        }));
      } else newData = null;
      setPagination({ ...page, total: res.pager.rowcount });
      setDisplayData(newData);
      setOriginData(newData);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData(pagination);
  }, []);

  return (
    <HomepageWrapper>
      <SearchBar
        originData={originData}
        setDisplayData={setDisplayData}
        searchBarTarget={searchBarTarget}
      />

      <EditableTable
        loading={loading}
        pagination={pagination}
        fetchData={fetchData}
        EditableCell={editableCell}
        originData={originData}
        setOriginData={setOriginData}
        displayData={displayData}
        editDataIndex={editDataIndex}
        columnsSetting={columnsSetting}
        onChange={(pagination, filters, sorter) => {
          fetchData(pagination);
        }}
      />
    </HomepageWrapper>
  );
}
