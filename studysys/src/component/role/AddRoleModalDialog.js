import React, { useEffect, useState } from "react";
import {message, Button, DatePicker, Modal, Input, Select, TreeSelect} from "antd";
import { api } from "../../../src/library/axios/Api";
import Form from "antd/lib/form";
import styled from "styled-components";
import { LeftMenuConfig } from "../../config/global/HomeLeftBarConfig";

const { Option } = Select;

const Styled_DatePicker = styled(DatePicker)`
  &&& {
    width: 400px;
  }
`;

const Styled_Input = styled(Input)`
  &&& {
    width: 100%;
  }
`;
export function AddRoleModalDialog(props) {
  const { fetchData } = props;
  const [visible, setVisible] = useState(false);
  const [roleList, setRoleList] = useState(null);
  const [form] = Form.useForm();

  useEffect(()=>{
    setRoleList(LeftMenuConfig.getList())
  },[])
  /**
   * Submit form to backend when click save button.
   * @param values: Form value.
   */
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    const params = {
      name: values["name"],
      menu: values["menu"],
    };
    api.addRole(params).then((res) => {
      if (res) {
        if (res["code"] === 0) {
          message.success(res["datas"]);
          fetchData();
          form.resetFields();
        } else message.error(res["message"]);
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
        Add Role
      </Button>
      <Modal
        visible={visible}
        title="Add Role"
        okText="Ok"
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
          <Form.Item
            key="name"
            name="name"
            rules={[
              {
                required: true,
                message: "please input an role name",
              },
            ]}
          >
            {<Styled_Input placeholder="Name" />}
          </Form.Item>

          <Form.Item
            key="menu"
            name="menu"
            rules={[
              {
                required: true,
                message: "please select a menu",
              },
            ]}
          >
            {/*<Select mode="multiple" placeholder="Please select">*/}
            {/*  {LeftMenuConfig.getList().map((item) => (*/}
            {/*    <Option key={item}>{item}</Option>*/}
            {/*  ))}*/}
            {/*</Select>*/}
              <TreeSelect
                  multiple
                  treeCheckable={true}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={roleList}
                  placeholder="Please select"
                  treeDefaultExpandAll
              />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
