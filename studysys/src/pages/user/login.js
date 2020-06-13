import React, { useState } from "react";
import { Form, Icon, Input, Button, Row, Col, Divider } from "antd";
import Axios from "axios";
import AlertMessage from "./alertMessage";
import { inputConfig } from "./formConfig";
import styled from "styled-components";

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some((field) => fieldsError[field]);
// }

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
  // const { getFieldDecorator } = props.form;
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  // const [token, setToken] = useState(
  //   localStorage.getItem("token") || undefined
  // );
  const BASE_URL = "http://t.ztest.org/api/teacher/login";

  /**
   * Store new token in Local Storage
   * @param {token} The token needed to save
   */
  const saveToken = async (token) => {
    console.log("save token to LocalStorage, token: " + token);
    await localStorage.setItem("token", token);
  };

  /**
   * Verify user authentication with backend server
   * @param {email} User email
   * @param {password} User password
   * @return {data} Data contains: {message, token, isAuthenticated }
   *            {message} The result of authentication.
   *            {token} If user succeed, this is the token from backend server.
   *            {isAuthenticated} Whether user succeed.
   */
  const verifyUser = async (email, password) => {
    // Headers config
    const headersConfig = {
      // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    };

    const requestBody = {
      email: email,
      password: password,
    };

    // Send a POST request with userId and password
    let response = undefined;
    try {
      response = await Axios.post(BASE_URL, requestBody, {
        headers: headersConfig,
      });
    } catch (e) {
      response = e.response;
    } finally {
      // Handle response data
      const responseData = response === undefined ? undefined : response.data;

      // Message
      const message = !responseData
        ? "Server is down, please try again later"
        : responseData.message;

      // Token
      const token =
        !responseData || !responseData.datas
          ? undefined
          : responseData.datas.token;

      // Whether user is successful
      const isAuthenticated = !responseData ? false : responseData.code === 0;

      return { message, token, isAuthenticated };
    }
  };

  /**
   * Handle submit action. if user is authenticated, the website will redirect to the URL user input
   */

  const onFinish = (values) => {
    console.log(values);
    verifyUser(values.username, values.password).then((data) => {
      console.log(data);
      // If user is authenticated, save the token and redirect to the URL user input
      if (data.isAuthenticated) {
        // let path = props.location.state.from || "/home";
        // console.log(path);
        saveToken(data.token).then(() => {
          console.log("redirect to /home");
          props.history.push("/home");
        });
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
