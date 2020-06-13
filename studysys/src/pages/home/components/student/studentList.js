import React from "react";
import { Table } from "antd";
import { ColumnsConfig } from "./config/studentListConfig";

function StudentList() {
  const data = [];
  for (let i = 1; i <= 120; i++) {
    data.push({
      key: i,
      name: "John Brown",
      age: `${i}2`,
      address: `New York No. ${i} Lake Park`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }

  const tableColumns = ColumnsConfig.map((item) => ({
    ...item,
    ellipsis: false,
  }));

  const state = {
    bordered: false,
    loading: false,
    pagination: { position: "bottom" },
    size: "default",
    title: undefined,
    showHeader: true,
    rowSelection: {},
    tableLayout: undefined,
    bottom: "bottomRight",
    scroll: { y: 300 },
  };

  return (
    <div>
      <Table {...state} columns={tableColumns} dataSource={data} />
    </div>
  );
}

export default StudentList;
