import React, { useEffect, useState } from "react";
import { Button, Input, Modal, message } from "antd";
import { api } from "../../library/axios/Api";
import {Log} from "../../library/Log";

function AddCourseTypeModalDialog(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newTypeName, setNewTypeName] = useState(null);
  const { fetchData } = props;

  const onSave = () => {
    setConfirmLoading(true);
    api.addCourseType(newTypeName).then((res) => {
      if (res) {
        if (res["error"]) message.error(res["message"]);
        else message.success("课程类型添加成功");
        fetchData();
      }
      setConfirmLoading(false);
    });
  };

  const onChange = (e) => {
    setNewTypeName(e.target.value);
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
