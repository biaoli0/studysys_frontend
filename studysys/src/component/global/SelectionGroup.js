import React from "react";
import { Button, Space, Input, Row, Select } from "antd";
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
  console.log(`inputValue ${inputValue}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

function onclick(val) {
  console.log("search:", val);
}

function SelectionGroup(props) {
  let inputValue;
  const { list, itemkey } = props;
  return (
    <Space direction="vertical" size="large">
      <Row>
        <Styled_Input value={inputValue} placeholder="Course name" />
      </Row>
      <Row>
        <Styled_Select
          showSearch
          placeholder="Select a course type"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {list
            ? list.map((item, key) => {
                return (
                  <Option key={key} value={item[itemkey]}>
                    {item[itemkey]}
                  </Option>
                );
              })
            : false}
        </Styled_Select>
      </Row>

      <Row>
        <Button type="primary" onclick={onclick}>
          Save Course
        </Button>
      </Row>
    </Space>
  );
}

export default SelectionGroup;
