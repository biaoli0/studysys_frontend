import React from "react";

export const ColumnsConfig = [
  {
    title: "ID",
    dataIndex: "id",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.id - b.id,
    ellipsis: false,
  },
  {
    title: "Student Name",
    dataIndex: "student_name",
    ellipsis: false,
  },
  {
    title: "Selected Course",
    dataIndex: "course_name",
    ellipsis: false,
  },
  {
    title: "Course Date",
    dataIndex: "course_date",
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
