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

export const Colors = {
  1: "pink",
  2: "red",
  3: "yellow",
  4: "orange",
  5: "cyan",
  6: "green",
  7: "blue",
  8: "purple",
  9: "geekblue",
  10: "magenta",
  11: "volcano",
  12: "gold",
  13: "lime",
  14: "#708090",
  15: "#FFF5EE",
};
