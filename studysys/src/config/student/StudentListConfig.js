import React from "react";
import {Log} from "../../library/Log";

export const ColumnsConfig = [
  {
    title: "ID",
    dataIndex: "id",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.student_id - b.student_id,
    ellipsis: false,
  },
  {
    title: "Name",
    dataIndex: "name",
    ellipsis: false,
  },
  {
    title: "Area",
    dataIndex: "address",
    ellipsis: false,
  },
  {
    title: "Student Type",
    dataIndex: "type_name",
    ellipsis: false,
  },
  {
    title: "Join time",
    dataIndex: "join_time",
    ellipsis: false,
  },
  {
    title: "Action",
    key: "action",
    ellipsis: false,
    render: (_, record) => {
      return (
        <a onClick={() => {
          Log.print(record);
          // edit(record)
        }}>
          Edit
        </a>
      );
    },
    // render: () => (
    //   <span>
    //     <a style={{ marginRight: 16 }} >Edit</a>
    //     <a>Delete</a>
    //   </span>
    // ),
  },
];
