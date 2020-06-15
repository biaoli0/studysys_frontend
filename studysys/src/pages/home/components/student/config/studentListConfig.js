import { DownOutlined } from "@ant-design/icons";
import React from "react";
import mokeJson from "./moke";

const arr = [];

mokeJson.datas.filter((item) =>
  !arr.includes(item.course_name) ? arr.push(item.course_name) : false
);

const filter = arr.map((course_name) => {
  return {
    text: course_name,
    value: course_name,
  };
});

export const ColumnsConfig = [
  {
    title: "ID",
    dataIndex: "student_id",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.student_id - b.student_id,
    ellipsis: false,
  },
  {
    title: "Name",
    dataIndex: "student_name",
    ellipsis: false,
  },
  {
    title: "Area",
    dataIndex: "address",
    ellipsis: false,
  },
  {
    title: "Selected Curriculum",
    dataIndex: "course_name",
    ellipsis: false,
    filters: filter,
    onFilter: (value, record) => record.course_name.indexOf(value) === 0,
  },
  {
    title: "Student Type",
    dataIndex: "student_type_name",
    ellipsis: false,
  },
  {
    title: "Join time",
    dataIndex: "homework",
    ellipsis: false,
  },
  {
    title: "Action",
    key: "action",
    ellipsis: false,
    render: () => (
      <span>
        <a style={{ marginRight: 16 }}>Edit</a>
        <a>Delete</a>
      </span>
    ),
  },
];
