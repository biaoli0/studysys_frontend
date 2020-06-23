import React, { useState } from "react";
import { message, Form, Button, Space, Input, Row, Select } from "antd";
import styled from "styled-components";
import { inputConfig } from "../../config/user/FormConfig";
import { api } from "../../library/axios/Api";
import { Log } from "../../library/Log";

const { Option } = Select;
const Styled_Input = styled(Input)`
  &&& {
    width: 300px;
  }
`;

const Styled_Select = styled(Select)`
  &&& {
    width: 300px;
  }
`;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 17,
  },
};

function onChange(value) {
  console.log(`selected ${value}`);
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

function SelectionGroup(props) {
  let inputValue;
  const { list, itemkey, itemname } = props;

  function onFinish(values) {
    Log.print(values);
    api.addCourse(values.courseName, values.courseType).then((isSuccess) => {
      if (isSuccess) {
        message.success("Course successfully added");
      } else message.error("Action is failed");
    });
  }

  return (
    <Space direction="vertical" size="large">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          key={"01"}
          name={"courseName"}
          rules={[
            {
              required: true,
              message: "Please input a course name",
            },
          ]}
        >
          <Styled_Input placeholder="Course name" />
        </Form.Item>

        <Form.Item
          key={"02"}
          name={"courseType"}
          rules={[
            {
              required: true,
              message: "Please select a course type",
            },
          ]}
        >
          <Styled_Select
            showSearch
            placeholder="Select a course type"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {list
              ? list.map((item, key) => {
                  return (
                    <Option key={key} value={item[itemkey]}>
                      {item[itemname]}
                    </Option>
                  );
                })
              : false}
          </Styled_Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Course
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}

export default SelectionGroup;
