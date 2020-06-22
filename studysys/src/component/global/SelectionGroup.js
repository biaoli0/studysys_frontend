import React from 'react';
import {Button, Col, Input, Row, Select} from "antd";
import styled from "styled-components";

const { Option } = Select;

const Styled_Input = styled(Input)`
  &&& {
    width: 200px;
  }
`;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}


function SelectionGroup(props) {
    const {list,itemkey} = props;
    return (
        <Row gutter={[16,6]}>
            <Col span={6}>
            <Styled_Input placeholder="Course name" />
            </Col>

            <Col span={6}>
                <Select
                showSearch
                style={{ width: 200 }}
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
                {
                    list?list.map((item,key)=>{
                        return <Option key ={key} value={item[itemkey]}>{item[itemkey]}</Option>
                    }):false}
                </Select>
            </Col>

            <Col span={6}>
                <Button type="primary">Save Course</Button>
            </Col>

        </Row>


    );
}

export default SelectionGroup;