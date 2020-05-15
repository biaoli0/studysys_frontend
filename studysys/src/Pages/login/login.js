import React, { useEffect, useState } from "react";
import { Form, Icon, Input, Button, Row, Col, Divider } from "antd";
import Axios from "axios";
import AlertMessage from "./alertMessage";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

//Login page
function Login(props) {
  const { getFieldDecorator } = props.form;
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [token, setToken] = useState(
    localStorage.getItem("token") || undefined
  );
  const [userId, setUserId] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const BASE_URL = "http://localhost:8080/token";

  useEffect(() => {
    // Verify user authentication then fetch a token from backend server
    const verifyUser = async () => {
      // Headers config
      let headersConfig = {
        "Content-Type": "application/json",
        user_id: userId,
        password: password,
      };

      // Send a POST request with userId and password
      let response = undefined;
      try {
        response = await Axios.post(BASE_URL, {}, { headers: headersConfig });
      } catch (e) {
        response = e.response;
      } finally {
        setIsAuthenticated(
          response === undefined ? false : response.status === 200
        );

        setMessage(
          response === undefined
            ? "Server is down, please try again later"
            : response.data.Message
        );

        setToken(
          response === undefined
            ? undefined
            : response.data.Token === undefined
            ? undefined
            : response.data.Token
        );
      }
    };

    // Avoid it automatically sends a request after render
    if (password !== undefined) verifyUser();
  }, [password, userId]);

  // Store new token in Local Storage
  useEffect(() => {
    if (token !== undefined) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setUserId(values.username);
        setPassword(values.password);
      }
    });
  };

  return (
    <div align="middle" style={{ height: "100%" }}>
      {isAuthenticated !== undefined ? (
        <AlertMessage isAuthenticated={isAuthenticated} message={message} />
      ) : null}

      {/*<p>*/}
      {/*  {userId +*/}
      {/*    " " +*/}
      {/*    password +*/}
      {/*    " " +*/}
      {/*    isAuthenticated +*/}
      {/*    " " +*/}
      {/*    message +*/}
      {/*    " " +*/}
      {/*    token}*/}
      {/*</p>*/}

      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: "100%" }}
      >
        <Col span={4}>
          <h4>Study System</h4>
          <Divider
            style={{
              margin: "20px 0px 20px 0px",
              color: "rgb(55, 51, 51)",
              height: "1.5px",
            }}
          />
          <Form
            onSubmit={handleSubmit}
            className="login-form"
            style={{ marginBottom: "20px" }}
          >
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "Enter your userName" }],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Password",
                  },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Enter your password"
                />
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                // onClick={() => {
                //   handleSubmit();
                // }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Form.create({ name: "normal_login" })(Login);
