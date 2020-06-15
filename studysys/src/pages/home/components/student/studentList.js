import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import { ColumnsConfig } from "./config/studentListConfig";
import mokeJson from "./config/moke";
import { api } from "../../../axios/api";

function StudentList() {
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    let data;
    api.getStudentList().then((res) => {
      if (res !== undefined) {
        data = res.map((item, key) => ({
          ...item,
          key: key,
        }));
      } else data = null;
      setDatas(data);
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
    const result = originDatas.filter((item) =>
      item.student_name.includes(target.value)
    );
    console.log(result);
    setDatas(result);
  };

  return (
    <div>
      <Input
        placeholder="search with student name..."
        style={{ width: 220 }}
        onChange={(value) => onChange(value.target)}
      />

      <Table {...state} columns={ColumnsConfig} dataSource={datas} />
    </div>
  );
}

export default StudentList;
