import React from "react";
import { Input } from "antd";

export const inputConfig = [
  {
    key: "0",
    label: "Email",
    name: "username",
    type: "email",
    message: "Your input email format is not valid",
    input: <Input placeholder="Email"/>,
  },
  {
    key: "1",
    label: "Password",
    name: "password",
    type: "",
    message: "Please input your Password",
    input: <Input placeholder="Password" type="password" />,
  },
];
