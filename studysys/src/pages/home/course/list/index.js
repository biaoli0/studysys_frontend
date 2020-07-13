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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [originData, setOriginData] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    position: "bottom",
    showSizeChanger: true,
    total: 400,
  });

  const fetchData = async (page) => {
    setLoading(true);
    let newData;
    const params = {
      page: page.current-1,
      pagesize:page.pageSize,
      kw:searchKeyword,
    }
    api.getCourseList(params).then((res) => {
      if (res && res.hasOwnProperty("datas")) {
        newData = res.datas.map((item, key) => ({
          ...item,
          key: key,
          join_time: <MyTimeAgo ctime={item["ctime"]} />,
        }));
      } else newData = null;
      setPagination({ ...page, total: res.pager.rowcount });
      setOriginData(newData);
      setLoading(false);
    });
  };

  useEffect(() => {
    let newpage = pagination;
    newpage.current = 1;
    fetchData(newpage);
  }, [searchKeyword]);

  const onChange =(keyword)=>{
    setSearchKeyword(keyword);
  }

  return (
    <HomepageWrapper>
      <SearchBar
          onChange={onChange}
      />

      <EditableTable
        loading={loading}
        pagination={pagination}
        fetchData={fetchData}
        EditableCell={editableCell}
        originData={originData}
        setOriginData={setOriginData}
        editDataIndex={editDataIndex}
        columnsSetting={columnsSetting}
        onChange={(pagination, filters, sorter) => {
          fetchData(pagination);
        }}
      />
    </HomepageWrapper>
  );
}
