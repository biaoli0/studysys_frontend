import React, { useState } from "react";
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
  const BASE_URL = "http://t.ztest.org/api/teacher/login";

  // Store new token in Local Storage
  const saveToken = async (token) => {
    console.log("save token to LocalStorage, token: " + token);
    await localStorage.setItem("token", token);
  };

  // Verify user authentication then fetch a token from backend server
  const verifyUser = async (userId, password) => {
    // Headers config
    let headersConfig = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    // Send a POST request with userId and password
    let response = undefined;
    try {
      response = await Axios.post(
        BASE_URL,
        { email: "admin@admin.com", password: "admin" },
        { headers: headersConfig }
      );
    } catch (e) {
      response = e.response;
    } finally {
      setIsAuthenticated(
        response === undefined ? false : response.status === 200
      );

      let message, token, isAuthenticated;
      message =
        response === undefined
          ? "Server is down, please try again later"
          : response.data.Message;
      token =
        response === undefined
          ? undefined
          : response.data.Token === undefined
          ? undefined
          : response.data.Token;
      isAuthenticated =
        response === undefined ? false : response.status === 200;

      return { message, token, isAuthenticated };
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        verifyUser(values.username, values.password).then((data) => {
          if (data.isAuthenticated) {
            let path = props.location.state.from;
            // console.log(path);
            saveToken(data.token).then(() => {
              console.log("redirect to /home");
              props.history.push("/home");
              setMessage(data.message);
              setIsAuthenticated(data.isAuthenticated);
            });
          } else {
            setMessage(data.message);
            setIsAuthenticated(data.isAuthenticated);
          }
        });
      }
    });
  }

  return (
    <div align="middle" style={{ height: "100%" }}>
      {isAuthenticated !== undefined ? (
        <AlertMessage isAuthenticated={isAuthenticated} message={message} />
      ) : null}

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
          <Form className="login-form" style={{ marginBottom: "20px" }}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    type: "email",
                    message: "Enter your email",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
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
                onClick={handleSubmit}
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
