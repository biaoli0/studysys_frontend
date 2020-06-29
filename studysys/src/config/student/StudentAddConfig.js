import { Button, Input, Select } from "antd";
import React from "react";
import styled from "styled-components";
const { Option } = Select;

const Styled_Input = styled(Input)`
  &&& {
    width: 300px;
  }
`;
const Styled_Select = styled(Select)`
  &&& {
    width: 300px;
  }
`;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}
export const StudentAddConfig = {
  getFormItems: (list, itemkey, itemname) => {
    return [
      {
        key: "01",
        name: "name",
        rulesMessage: "Please input a student name",
        component: <Styled_Input placeholder="Student name" />,
      },
      {
        key: "02",
        name: "password",
        rulesMessage: "Please input password",
        component: <Styled_Input placeholder="Password" />,
      },
      {
        key: "03",
        name: "typeId",
        rulesMessage: "Please select a student type",
        component: (
          <Styled_Select
            showSearch
            placeholder="Select a student type"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {list[0]
              ? list[0].map((item, key) => {
                  return (
                    <Option key={key} value={item[itemkey[0]]}>
                      {item[itemname[0]]}
                    </Option>
                  );
                })
              : false}
            )}
          </Styled_Select>
        ),
      },
      {
        key: "04",
        name: "courseId",
        rulesMessage: "Please select a course",
        component: (
          <Styled_Select
            showSearch
            placeholder="Select a course"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {list[1]
              ? list[1].map((item, key) => {
                  return (
                    <Option key={key} value={item[itemkey[1]]}>
                      {item[itemname[1]]}
                    </Option>
                  );
                })
              : false}
            )}
          </Styled_Select>
        ),
      },
      {
        key: "05",
        name: "address",
        rulesMessage: "Please input your address",
        component: <Styled_Input placeholder="Address" />,
      },
    ];
  },

  getSubmitButton: () => {
    return (
      <Button type="primary" htmlType="submit">
        Save Student
      </Button>
    );
  },
};
