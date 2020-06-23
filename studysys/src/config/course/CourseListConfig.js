import React from "react";
import {Popconfirm} from "antd";

export function CourseListColumnsConfig(props){
    const {} = props;
    return ([
        {
            title: "ID",
            dataIndex: "id",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.id - b.id,
            ellipsis: false,
            editable: false,
        },
        {
            title: "Name",
            dataIndex: "name",
            ellipsis: false,
            editable: true,
        },
        {
            title: "Type",
            dataIndex: "type_name",
            ellipsis: false,
            editable: false,
        },
        {
            title: "Action",
            key: "action",
            ellipsis: false,
            editable: false,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </a>

            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </a>
                );
            },
        },
    ])
}
