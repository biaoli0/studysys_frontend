import React, {useEffect, useState} from "react";
import { Button, Input, Modal } from "antd";
import {api} from "../../library/axios/Api";

export function SelectCourseModalDialog(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newTypeName, setNewTypeName] = useState(null);
  const [studentList, setStudentList] = useState(null);
  const [courseList, setCourseList] = useState(null);

  useEffect(()=>{
    api.getStudentList().then(res=>{
        if (res){
            setStudentList(res);
        }
    })
    api.getCourseList().then(res=>{
        if (res){
            setCourseList(res);
        }
    })
},[]);

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
          Add Selection
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

