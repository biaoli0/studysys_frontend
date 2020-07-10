import React, { useEffect, useState } from "react";
import { message, Button, DatePicker, Modal, Input } from "antd";
import { api } from "../../../src/library/axios/Api";
import Form from "antd/lib/form";
import styled from "styled-components";

const Styled_DatePicker = styled(DatePicker)`
  &&& {
    width: 400px;
  }
`;

const Styled_Input = styled(Input)`
  &&& {
    width: 300px;
  }
`;
export function AddTeacherModalDialog(props) {
  const { fetchData } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  /**
   * Submit form to backend when click save button.
   * @param values: Form value.
   */
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    api
      .addTeacher(values["username"], values["email"], values["password"])
      .then((res) => {
        if (res) {
          if (res["code"] === 0) {
            message.success(res["datas"]);
            fetchData();
            form.resetFields();
          } else message.error(res["message"]);
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
        Add Teacher
      </Button>
      <Modal
        visible={visible}
        okText="Ok"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            key="username"
            name="username"
            rules={[
              {
                required: true,
                message: "please input an username",
              },
            ]}
          >
            {<Styled_Input placeholder="Username" />}
          </Form.Item>

          <Form.Item
            key="email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "please input an valid email",
              },
            ]}
          >
            {<Styled_Input placeholder="Email" />}
          </Form.Item>

          <Form.Item
            key="password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password",
              },
            ]}
          >
            <Styled_Input placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
