import React from "react";
import { Log } from "../../library/Log";
import { EditStudentModalDialog } from "../../component/student/list/EditStudentModalDialog";
import {Popconfirm, message, Tag} from "antd";
import { api } from "../../library/axios/Api";
import {LeftMenuConfig} from "../global/HomeLeftBarConfig";

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
      title: "Role Name",
      dataIndex: "name",
      ellipsis: false,
    },
    {
      title: "Menus",
      dataIndex: "menu",
      ellipsis: false,
      render: (menus) => <span>
        {
          menus.map(menu=>{
            const color = LeftMenuConfig.getColor(menu);
            const name = LeftMenuConfig.getName(menu);
            return <Tag color={color} key={menu}>
              {name}
            </Tag>
          })
        }
      </span>,
    },
    {
      title: "Action",
      key: "action",
      ellipsis: false,
      render: (_, record) => (
        <span>
          {/*<EditStudentModalDialog record={record} fetchData={fetchData} />*/}
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              api.deleteRole({ id: record["id"] }).then((res) => {
                if (res) {
                  if (res["error"]) {
                    message.error(res["message"]);
                  } else {
                    message.success(res["datas"]);
                    fetchData();
                  }
                }
              });
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
}
