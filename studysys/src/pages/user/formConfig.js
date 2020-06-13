import React from "react";
import { Form, Icon, Input, Button, Row, Col, Divider } from "antd";

export const inputConfig = [
  {
    key: "0",
    label: "Email",
    name: "username",
    type: "email",
    message: "Your input email format is not valid",
    input: <Input />,
  },
  {
    key: "1",
    label: "Password",
    name: "password",
    type: "",
    message: "Please input your Password",
    input: <Input.Password />,
  },
];
