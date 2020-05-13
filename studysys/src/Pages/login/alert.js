import React from "react";
import { Alert } from "antd";

function Alert(props) {
  return (
    <div>
      <Alert
        message="Error"
        description="This is an error message about copyrighting."
        type="error"
        showIcon
        closable
      />
    </div>
  );
}

export default Alert;
