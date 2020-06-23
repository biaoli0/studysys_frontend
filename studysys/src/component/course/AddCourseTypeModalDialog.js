import React, { useState } from "react";
import { Button, Input, Modal } from "antd";

function AddCourseTypeModalDialog(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newTypeName, setNewTypeName] = useState(null);

  const onSave = () => {
    setConfirmLoading(true);
  };

  const onChange = (e) => {
    setNewTypeName(e.target);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Type
      </Button>

      <Modal
        title="New course type"
        visible={visible}
        onOk={onSave}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Input onChange={onChange} />
      </Modal>
    </div>
  );
}

export default AddCourseTypeModalDialog;
