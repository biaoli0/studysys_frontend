import React, { useEffect, useState } from "react";
import {message, Button, DatePicker, Modal, Input, Spin, Space} from "antd";
import { api } from "../../library/axios/Api";
import Form from "antd/lib/form";
import styled from "styled-components";
import ListSelection from "../global/ListSelection";

export function EditCourseModalDialog(props) {
  const { record, fetchData } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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
      )
      .then((res) => {
        setLoading(false);
        if (res) {
          if (res["code"] === 0) {
            message.success(res["datas"]);
            fetchData();
          } else message.error(res["message"]);
        }
      });
  };

  return (
    <Space>
      <a
        onClick={() => {
          setVisible(true);
        }}
      >
        Edit
      </a>

      <Modal
        visible={visible}
        title={`Student ID: ${record["id"]}`}
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
        <Spin spinning={loading}>
          <Form form={form} layout="vertical" name="form_in_modal">
            <Form.Item name="id" initialValue={record["id"]}>
              <span>{`ID: ${record["id"]}`}</span>
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: `Please input a name`,
                },
              ]}
              initialValue={record["name"]}
            >
              <Input defaultValue={record["name"]} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </Space>
  );
}
