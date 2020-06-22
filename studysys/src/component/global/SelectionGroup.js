import React from 'react';
import { Select } from "antd";
import {Log} from "../../library/Log";
import HomepageWrapper from "./HomepageWrapper";

const { Option } = Select;

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
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>

    );
}

export default SelectionGroup;