import React, { useState } from "react";
import { Form, Icon, Input, Button, Row, Col, Divider } from "antd";
import Axios from "axios";
import AlertMessage from "./alertMessage";
import { inputConfig } from "./formConfig";
import styled from "styled-components";
import { api } from "../axios/api";
import Router from "next/router";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 17,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

const Styled_Button = styled(Button)`
  width: 50%;
`;
const DemoBox = styled.p`
  height: 100px;
`;
//Login page
export default function Login(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  /**
   * Handle submit action. if user is authenticated, the website will redirect to the URL user input
   */
  const onFinish = (values) => {
    console.log(values);
    api.verifyUser(values.username, values.password).then((data) => {
      console.log(data);
      // If user is authenticated, save the token and redirect to the URL user input
      if (data.isAuthenticated) {
        // let path = props.location.state.from || "/home";
        // console.log(path);
        console.log("redirect to /home");
        Router.push("/home/student/list");
      }
      setMessage(data.message);
      setIsAuthenticated(data.isAuthenticated);
    });
  };

  return (
    <div align="middle" style={{ height: "100%" }}>
      {isAuthenticated !== undefined ? (
        <AlertMessage isAuthenticated={isAuthenticated} message={message} />
      ) : null}
      <Row justify="space-around">
        <Col span={8}>
          <DemoBox>{}</DemoBox>
        </Col>
      </Row>
      <Row type="flex" justify="center" align="middle">
        <Col span={8}>
          <h2>Curriculum Assistant</h2>
          <Divider />
          {/* Email and password input item */}
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {inputConfig.map((item) => {
              return (
                <Form.Item
                  key={item.key}
                  label={item.label}
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

            <Form.Item {...tailLayout}>
              <Styled_Button type="primary" htmlType="submit">
                Login
              </Styled_Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
