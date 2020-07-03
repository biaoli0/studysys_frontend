import React, { useEffect, useState } from "react";
import {
  message,
  Button,
  DatePicker,
  Modal,
  Input,
  Spin,
  Space,
  Table,
} from "antd";
import { api } from "../../../../library/axios/Api";
import Form from "antd/lib/form";
import styled from "styled-components";
import ListSelection from "../../../global/ListSelection";
import { Log } from "../../../../library/Log";
import Kit from "../../../../library/Kit";

export function CalendarOnclickModalDialog(props) {
  const { visible, setVisible, selectedDate } = props;
  const dateFormat = "YYYY-MM-DD";
  const [list, setList] = useState([{key: 0}]);

  useEffect(() => {
    if (selectedDate) {
      let newList;
      api
        .getSelectionByDate(Kit.dateConvert(selectedDate, dateFormat))
        .then((res) => {
          if (res) {
            newList = res.map((item, key) => ({
              ...item,
              key: key,
            }));
          } else newList = null;
          setList(newList);
        });
    }
  }, [selectedDate]);

  const columns = [
    {
      title: "Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Course",
      dataIndex: "course_name",
      key: "course_name",
    },
  ];

  return (
    <Space>
      <Modal
        visible={visible}
        title={"Selection Detail"}
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button
            type="primary"
            onClick={() => {
              setVisible(false);
            }}
          >
            OK
          </Button>,
        ]}
      >
        <Table columns={columns} dataSource={list} />
      </Modal>
    </Space>
  );
}
