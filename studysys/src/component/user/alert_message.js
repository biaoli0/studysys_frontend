import React from "react";
import { Alert } from "antd";

function Alert_message(props) {
  return (
    <Alert
      style={{
        width: "fit-content",
        marginTop: "20px",
      }}
      message={props.isAuthenticated ? "登录成功！" : props.message}
      type={props.isAuthenticated ? "success" : "error"}
      showIcon={true}
      closable={false}
    />
  );
}

export default Alert_message;
