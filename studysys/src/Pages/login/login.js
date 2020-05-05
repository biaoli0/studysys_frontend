import React from "react";

import { Form, Icon, Input, Button, Row, Col, Divider } from "antd";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

const handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      console.log("Received values of form: ", values);
    }
  });
};

//Login page
function Login(props) {
  const { getFieldDecorator } = props.form;

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
