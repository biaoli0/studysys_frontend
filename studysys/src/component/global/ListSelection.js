import React from "react";
import Form from "antd/lib/form";
import styled from "styled-components";
import { Select } from "antd";
const { Option } = Select;

function ListSelection(props) {
  const { list, listName, itemKey, itemName, initialValue, width } = props;
  const Styled_Select = styled(Select)`
    &&& {
      width: ${width};
    }
  `;
  return (
    <Form.Item
      name={listName}
      rules={[
        {
          required: true,
          message: `Please select a ${listName}`,
        },
      ]}
      initialValue={initialValue ? initialValue : null}
    >
      <Styled_Select
        showSearch
        placeholder={listName}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultValue={initialValue ? initialValue : null}
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
