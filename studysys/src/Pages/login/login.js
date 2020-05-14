import React from "react";
import { Form, Icon, Input, Button, Row, Col, Divider } from "antd";
import { fakeAuth } from "../route/privateRoute";
import Axios from "axios";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

//Login page
function Login(props) {
  const { getFieldDecorator } = props.form;
  // Verify user ID and password
  const verifyUser = (values) => {
    let axiosConfig = {
      "Content-Type": "application/json",
      user_id: values.username,
      password: values.password,
    };
    Axios.post("http://localhost:8080", {}, { headers: axiosConfig }).then(
      (res) => {
        console.log(res);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        verifyUser(values);
        // if (verifyUser(values)) {
        // }
        props.form.props.history.push(props.location.state.from);
      }
    });
  };

  return (
    <Row type="flex" justify="center" align="middle" style={{ height: "100%" }}>
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
              onClick={() => {
                fakeAuth.authenticate();
                console.log(fakeAuth.isAuthenticated);
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Form.create({ name: "normal_login" })(Login);
