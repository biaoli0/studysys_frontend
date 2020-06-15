import React, { useState } from "react";
import { Table, Input } from "antd";
import { ColumnsConfig } from "./config/studentListConfig";
import mokeJson from "./config/moke";
import { api } from "../../../axios/api";

function getOriginDatas() {
  let data = api.getStudentList();
  data = !data ? mokeJson.datas : data;
  return data.map((item, key) => ({
    ...item,
    key: key,
  }));
}

function StudentList() {
  const originDatas = getOriginDatas();
  const [datas, setDatas] = useState(originDatas);
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
