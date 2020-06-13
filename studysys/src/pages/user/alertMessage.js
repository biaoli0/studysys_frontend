import React from "react";
import { Alert } from "antd";

function AlertMessage(props) {
  return (
    <Alert
      style={{
        width: "fit-content",
        marginTop: "20px",
      }}
      message={props.message}
      type={props.isAuthenticated ? "success" : "error"}
      showIcon={true}
      closable={false}
    />
  );
}

export default AlertMessage;
