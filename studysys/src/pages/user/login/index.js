import React, { useState } from "react";
import { Form, Button, Row, Col, Divider, Select, Space, message } from "antd";
import { inputConfig } from "../../../config/user/FormConfig";
import styled from "styled-components";
import Router from "next/router";
import { api } from "../../../library/axios/Api";
import { Log } from "../../../library/Log";

const Option = Select.Option;

const Styled_Button = styled(Button)`
  &&& {
    width: 100%;
  }
`;

const Styled_Select = styled(Select)`
  &&& {
    width: 100%;
  }
`;

const DemoBox = styled.p`
  &&& {
    height: 100px;
  }
`;

//Login page
export default function Login() {
  /**
   * Handle submit action. if user is authenticated, the website will redirect to the URL user input
   */
  const onFinish = (values) => {
    console.log(values);
    api
      .verifyUser(values.login_type, values.username, values.password)
      .then((data) => {
        Log.print(data);
        // If user is authenticated, save the token and redirect to the URL user input
        if (data.isAuthenticated) {
          message.success(data.message);
          const loginType = localStorage.getItem("login-type");
          switch (loginType) {
            case "teacher":Router.push("/home/student/list");break;
            case "student":Router.push("/home/student/selection");break;
            case "manager":Router.push("/home/teacher/list");break;
          }
        } else message.error(data.message);
      });
  };

  return (
    <div align="center" style={{ height: "100%" }}>
      <Row justify="space-around">
        <Col span={8}>
          <DemoBox>{}</DemoBox>
        </Col>
      </Row>

      <Space direction="vertical">
        <h2>Curriculum Assistant</h2>
        <Divider />
        {/* Email and password input item */}

        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            key="2"
            name="login_type"
            rules={[
              {
                required: true,
                message: "Please select a login type",
              },
            ]}
          >
            <Styled_Select showSearch placeholder="Login Type">
              <Option key="0" value="teacher">
                Teacher
              </Option>
              <Option key="1" value="student">
                Student
              </Option>
              <Option key="2" value="manager">
                Manager
              </Option>
            </Styled_Select>
          </Form.Item>

          {inputConfig.map((item) => {
            return (
              <Form.Item
                key={item.key}
                name={item.name}
                rules={[
                  {
                    type: item.type,
                    required: true,
                    message: item.message,
                  },
                ]}
              >
                {item.input}
              </Form.Item>
            );
          })}

          <Form.Item>
            <Styled_Button type="primary" htmlType="submit">
              Login
            </Styled_Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
}
