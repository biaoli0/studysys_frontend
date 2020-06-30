import React, { useEffect, useState } from "react";
import { message, Button, DatePicker, Modal } from "antd";
import { api } from "../../library/axios/Api";
import Form from "antd/lib/form";
import styled from "styled-components";
import ListSelection from "../global/ListSelection";

const Styled_DatePicker = styled(DatePicker)`
  &&& {
    width: 400px;
  }
`;

export function SelectCourseModalDialog(props) {
  const {fetchData} = props;
  const [visible, setVisible] = useState(false);
  const [studentList, setStudentList] = useState(null);
  const [courseList, setCourseList] = useState(null);
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    api.getStudentList().then((res) => {
      if (res) {
        setStudentList(res);
      }
    });
    api.getCourseList().then((res) => {
      if (res) {
        setCourseList(res);
      }
    });
  }, []);

  /**
   * Submit form to backend when click save button.
   * @param values: Form value.
   */
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    api
      .courseSelection(
        values["Student"],
        values["Course"],
        values["date"].format("YYYY-MM-DD")
      )
      .then((res) => {
        if (res) {
          if (res["code"] === 0) {
            message.success(res["datas"]);
            fetchData();
            form.resetFields();
          }
          else message.error(res["message"]);
        }
      });
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
        visible={visible}
        title="Add Course Selection"
        okText="Save"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <ListSelection list={studentList} listName="Student" itemKey="id" itemName="name" width="400px"/>
          <ListSelection list={courseList} listName="Course" itemKey="id" itemName="name" width="400px"/>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: `Please select a date`,
              },
            ]}
          >
            <Styled_DatePicker format={dateFormat} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
