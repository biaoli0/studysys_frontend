import React, { useState, useEffect } from "react";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import {Button, Form, Input, message, Space, useForm} from "antd";
import styled from "styled-components";

const Styled_Form = styled(Form)`
  &&& {
    width: 350px;
  }
`;

export default function ChangePassword() {
    const [form] = Form.useForm();
  const onFinish = (values) => {
    const params = {
      old_password: values.old_password,
      new_password: values.new_password,
    };
    api.changePassword(params).then((res) => {
      if (res.hasOwnProperty("error") && !res.error) {
        message.success("Password Changed");
        form.resetFields();
      } else message.error("Action is failed");
    });
  };

  return (
    <HomepageWrapper>
      <Space direction="vertical" size="large">
        <Styled_Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            key="01"
            name="old_password"
            rules={[
              {
                required: true,
                message: "Please input your old password",
              },
            ]}
          >
            <Input.Password placeholder="Old password" />
          </Form.Item>

          <Form.Item
            key="02"
            name="new_password"
            rules={[
              {
                required: true,
                message: "Please input your new password",
              },
            ]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>

            <Form.Item
                key="03"
                name="repeat_password"
                dependencies={["new_password"]}
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password",
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('new_password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="New password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Styled_Form>
      </Space>
    </HomepageWrapper>
  );
}
