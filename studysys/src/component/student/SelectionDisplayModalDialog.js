import React, { useEffect, useState } from "react";
import { message, Button, DatePicker, Modal, Input, Spin, Space } from "antd";
import { api } from "../../library/axios/Api";
import Form from "antd/lib/form";
import styled from "styled-components";
import ListSelection from "../global/ListSelection";
import { Log } from "../../library/Log";
import Kit from "../../library/Kit";

export function SelectionDisplayModalDialog(props) {
  const { visible, setVisible, selectedDate } = props;
  const [loading, setLoading] = useState(false);
  const [studentType, setStudentType] = useState(null);
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    api.getStudentTypeList().then((res) => {
      if (res) {
        setStudentType(res);
      }
    });
  }, []);

  /**
   * Submit form to backend when click save button.
   * @param values: Form value.
   */
  const onSave = (values) => {
    console.log("Received values of form: ", values);
    api
      .updateStudent(
        values["id"],
        values["name"],
        values["studentType"],
        values["address"]
      )
      .then((res) => {
        setLoading(false);
        if (res) {
          if (res["code"] === 0) {
            message.success(res["datas"]);
          } else message.error(res["message"]);
        }
      });
  };

  return (
    <Space>
      <Modal
        visible={visible}
        title={`Student ID:`}
        okText="Save"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setLoading(true);
          form
            .validateFields()
            .then((values) => {
              onSave(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        {Kit.dateConvert(selectedDate)}
      </Modal>
    </Space>
  );
}
