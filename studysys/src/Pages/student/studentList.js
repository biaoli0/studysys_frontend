import React from "react";
import { Table, Switch, Radio, Form } from "antd";
import { DownOutlined } from "@ant-design/icons";

function StudentList() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      filters: [],
      onFilter: () => {},
      render: () => (
        <span>
          <a style={{ marginRight: 16 }}>Delete</a>
          <a className="ant-dropdown-link">
            More actions <DownOutlined />
          </a>
        </span>
      ),
    },
  ];

  const data = [];
  for (let i = 1; i <= 120; i++) {
    data.push({
      key: i,
      name: "John Brown",
      age: `${i}2`,
      address: `New York No. ${i} Lake Park`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }

  const pagination = { position: "bottom" };
  const expandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };
  const showHeader = true;

  const state = {
    bordered: false,
    loading: false,
    pagination,
    size: "default",
    expandable,
    title: undefined,
    showHeader,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: "topRight",
    bottom: "bottomRight",
    ellipsis: false,
  };

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: state.ellipsis,
  }));

  const scroll = {};
  scroll.y = 300;
  // scroll.x = "100vw";

  return (
    <div>
      <Table
        {...state}
        columns={tableColumns}
        dataSource={state.hasData ? data : null}
        scroll={scroll}
      />
    </div>
  );
}

export default StudentList;
