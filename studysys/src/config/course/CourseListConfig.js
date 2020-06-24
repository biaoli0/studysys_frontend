import React from "react";
import { Form, Input } from "antd";

export const editableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input Course Name!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const editDataIndex = { id: 0, name: "", type_name: "", create_at: "" };
export const columnsSetting = [
  {
    title: "ID",
    dataIndex: "id",
    width: "10%",
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "25%",
    editable: true,
  },
  {
    title: "Type",
    dataIndex: "type_name",
    width: "20%",
  },
  {
    title: "Create At",
    dataIndex: "create_at",
    width: "20%",
  },
];
