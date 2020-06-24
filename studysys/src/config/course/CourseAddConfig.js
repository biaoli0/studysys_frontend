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
export const CourseAddConfig = {
  getFormItems: (list, itemkey, itemname) => {
    return [
      {
        key: "01",
        name: "courseName",
        rulesMessage: "Please input a course name",
        component: <Styled_Input placeholder="Course name" />,
      },
      {
        key: "02",
        name: "courseType",
        rulesMessage: "Please select a course type",
        component: (
          <Styled_Select
            showSearch
            placeholder="Select a course type"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {list
              ? list.map((item, key) => {
                  return (
                    <Option key={key} value={item[itemkey]}>
                      {item[itemname]}
                    </Option>
                  );
                })
              : false}
            )}
          </Styled_Select>
        ),
      },
    ];
  },

  getSubmitButton: () => {
    return (
      <Button type="primary" htmlType="submit">
        Save Course
      </Button>
    );
  },
};
