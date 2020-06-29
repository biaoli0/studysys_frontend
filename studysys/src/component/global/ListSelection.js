import React from "react";
import Form from "antd/lib/form";
import styled from "styled-components";
import { Select } from "antd";
const { Option } = Select;

const Styled_Select = styled(Select)`
  &&& {
    width: 400px;
  }
`;

function ListSelection(props) {
  const { list, listName, itemKey, itemName } = props;

  return (
    <Form.Item
      name={listName}
      rules={[
        {
          required: true,
          message: `Please select a ${listName}`,
        },
      ]}
    >
      <Styled_Select
        showSearch
        placeholder={listName}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {list
          ? list.map((item, key) => {
              return (
                <Option key={key} value={item[itemKey]}>
                  {item[itemName]}
                </Option>
              );
            })
          : false}
        )}
      </Styled_Select>
    </Form.Item>
  );
}

export default ListSelection;
