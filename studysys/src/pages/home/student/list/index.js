import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import { ColumnsConfig } from "../../../../library/component/student/studentListConfig";
import { api } from "../../../../library/axios/api";
import HomepageWrapper from "../../../../library/component/homepageWrapper";
import { Log } from "../../../../library/log";

function StudentList() {
  const [displayData, setDisplayData] = useState(null);
  const [originData, setOriginData] = useState(null);

  useEffect(() => {
    let fetchData;
    api.getStudentList().then((res) => {
      if (res !== undefined) {
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

  const onChange = (target) => {
    const result = originData.filter((item) =>
      item.student_name.includes(target.value)
    );
    Log.print(result);
    setDisplayData(result);
  };

  return (
    <HomepageWrapper>
      <Input
        placeholder="search with student name..."
        style={{ width: 220 }}
        onChange={(value) => onChange(value.target)}
      />

      <Table {...state} columns={ColumnsConfig} dataSource={displayData} />
    </HomepageWrapper>
  );
}

export default StudentList;
