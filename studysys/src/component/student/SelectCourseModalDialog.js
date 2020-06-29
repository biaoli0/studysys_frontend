import React, { useEffect, useState } from "react";
import { message, Button, DatePicker, Modal, Radio, Select } from "antd";
import { api } from "../../library/axios/Api";
import Form from "antd/lib/form";
import styled from "styled-components";
import moment from "moment";

export function SelectCourseModalDialog(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [studentList, setStudentList] = useState(null);
  const [courseList, setCourseList] = useState(null);

  const { Option } = Select;
  const dateFormat = "DD/MM/YYYY";

  const Styled_Select = styled(Select)`
    &&& {
      width: 400px;
    }
  `;

  const Styled_DatePicker = styled(DatePicker)`
    &&& {
      width: 400px;
    }
  `;

  useEffect(() => {
    api.getStudentList().then((res) => {
      if (res) {
        setStudentList(res);
      }
    });
    api.getCourseList().then((res) => {
      if (res) {
        setCourseList(res);
      }
    });
  }, []);

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  function renderList(list, listName, itemKey, itemName) {
    return (
      <Form.Item
        name={listName}
        rules={[
          {
            required: true,
            message: `Please select a ${listName}`,
          },
        ]}
      >
        <Styled_Select
          showSearch
          placeholder={listName}
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {list
            ? list.map((item, key) => {
                return (
                  <Option key={key} value={item[itemKey]}>
                    {item[itemName]}
                  </Option>
                );
              })
            : false}
          )}
        </Styled_Select>
      </Form.Item>
    );
  }
  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Add Course Selection"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          {renderList(studentList, "Student", "id", "name")}
          {renderList(courseList, "Course", "id", "name")}

          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: `Please select a date`,
              },
            ]}
          >
            <Styled_DatePicker format={dateFormat} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    api
      .courseSelection(
        values["Student"],
        values["Course"],
        values["date"].format("YYYY-MM-DD")
      )
      .then((res) => {
        if (res) {
          if (res["code"] === 0) message.success(res["datas"]);
          else message.error(res["message"]);
        }
      });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}
