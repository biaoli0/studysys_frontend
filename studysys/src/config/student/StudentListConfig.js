import React from "react";
import { Log } from "../../library/Log";
import { EditStudentModalDialog } from "../../component/student/EditStudentModalDialog";

export function ColumnsConfig(fetchData) {
  return [
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
        return <EditStudentModalDialog record={record} fetchData={fetchData}/>;
      },
      // render: () => (
      //   <span>
      //     <a style={{ marginRight: 16 }} >Edit</a>
      //     <a>Delete</a>
      //   </span>
      // ),
    },
  ];
}
