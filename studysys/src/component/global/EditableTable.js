import React, { useState } from "react";
import { Table, Form, Popconfirm, message, Space } from "antd";
import { Log } from "../../library/Log";
import { api } from "../../library/axios/Api";

export default function EditableTable(props) {
  const {
    fetchData,
    EditableCell,
    originData,
    setOriginData,
    pagination,
    onChange,
    editDataIndex,
    columnsSetting,
    loading,
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
    const newDisplayData = [...originData];
    const index = originData.findIndex((item) => key === item.key);
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

  const deleteButton = (record) => {
    return (
      <Popconfirm
        title="Are you sure?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => {
          api.deleteCourse(record["id"]).then((res) => {
            if (res) {
              if (res["error"]) {
                message.error(res["message"]);
              } else {
                message.success("课程删除成功");
                fetchData();
              }
            }
          });
        }}
      >
        <a>Delete</a>
      </Popconfirm>
    );
  };

  const columns = [
    ...columnsSetting,
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <a onClick={cancel}>Cancel</a>
            {deleteButton(record)}
          </Space>
        ) : (
          <Space>
            <a disabled={editingKey !== ""} onClick={() => edit(record)}>
              Edit
            </a>
            {deleteButton(record)}
          </Space>
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
        loading={loading}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={originData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          ...pagination,
          onChange: cancel,
        }}
        onChange={onChange}
      />
    </Form>
  );
}
