import React, { useState } from "react";
import { Form, Icon, Input, Button, Row, Col, Divider } from "antd";
import Axios from "axios";
import AlertMessage from "./alertMessage";
import qs from "qs";
import { inputConfig } from "./formConfig";

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some((field) => fieldsError[field]);
// }

//Login page
function Login(props) {
  const { getFieldDecorator } = props.form;
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
   *            {token} If login succeed, this is the token from backend server.
   *            {isAuthenticated} Whether login succeed.
   */
  const verifyUser = async (email, password) => {
    // Headers config
    const headersConfig = {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    };

    const requestBody = {
      email: email,
      password: password,
    };

    // Send a POST request with userId and password
    let response = undefined;
    try {
      response = await Axios.post(BASE_URL, qs.stringify(requestBody), {
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
        !responseData && !responseData.datas
          ? responseData.datas.token
          : undefined;

      // Whether login is successful
      const isAuthenticated = responseData ? false : responseData.code === 0;

      return { message, token, isAuthenticated };
    }
  };

  /**
   * Handle submit action. if user is authenticated, the website will redirect to the URL user input
   */
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        verifyUser(values.username, values.password).then((data) => {
          console.log(data.message, data.token, data.isAuthenticated);
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

          <Divider className={"divider"} />

          {/*Email and password input items*/}
          <Form className="login-form" style={{ marginBottom: "20px" }}>
            {inputConfig.map((item) => {
              return (
                <Form.Item key={item.key}>
                  {getFieldDecorator(item.fieldDecorator.name, {
                    rules: [
                      {
                        required: true,
                        type: item.fieldDecorator.type,
                        message: item.fieldDecorator.message,
                      },
                    ],
                  })(
                    <Input
                      prefix={<Icon type={item.prefix.iconType} />}
                      type={item.prefix.type}
                      placeholder={item.prefix.placeholder}
                    />
                  )}
                </Form.Item>
              );
            })}

            {/*Login button*/}
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
