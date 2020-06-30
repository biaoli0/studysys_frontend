import React from "react";
import { api } from "../../library/axios/Api";
import { Popconfirm, message, Space } from "antd";

export function CourseTypeListColumnsConfig(fetchData) {
  return [
    {
      title: "ID",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      ellipsis: false,
    },
    {
      title: "Name",
      dataIndex: "name",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.student_id - b.student_id,
      ellipsis: false,
    },
    {
      title: "Action",
      key: "action",
      ellipsis: false,
      render: (_, record) => (
        <Space>
          {/*<EditCourseModalDialog record={record} fetchData={fetchData} />*/}
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              api.deleteCourseType(record["id"]).then((res) => {
                if (res) {
                  if (res["error"]) {
                    message.error(res["message"]);
                  } else {
                    message.success("课程类型删除成功");
                    fetchData();
                  }
                }
              });
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
}
