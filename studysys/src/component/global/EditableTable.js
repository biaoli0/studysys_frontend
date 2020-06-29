import React, { useState } from "react";
import { Table, Form } from "antd";
import { Log } from "../../library/Log";
import { api } from "../../library/axios/Api";

export default function EditableTable(props) {
  const {
    EditableCell,
    originData,
    setOriginData,
    displayData,
    setDisplayData,
    editDataIndex,
    columnsSetting,
  } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...editDataIndex,
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const updateDisplayData = (key, row) => {
    const newDisplayData = [...displayData];
    const index = displayData.findIndex((item) => key === item.key);
    if (index > -1) {
      let updateItem = newDisplayData[index];
      updateItem = { ...updateItem, ...row };
      api.updateCourse(updateItem).then((res) => {
        if (res) {
          newDisplayData.splice(index, 1, updateItem);
          // setDisplayData(newDisplayData);
          setEditingKey("");
          updateOriginData(updateItem);
        }
      });
    }
  };

  const updateOriginData = (updateItem) => {
    const newOriginData = [...originData];
    const index = newOriginData.findIndex((item) => updateItem.id === item.id);
    newOriginData.splice(index, 1, updateItem);
    setOriginData(newOriginData);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      Log.print(row);
      updateDisplayData(key, row);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    ...columnsSetting,
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={displayData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
}
