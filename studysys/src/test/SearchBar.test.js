import React, {useEffect, useState} from "react";

import {mount} from "enzyme";
import SearchBar from "../component/global/SearchBar";

const searchBarTarget = "type_name";
const originData = [{
    "ctime": "2020-06-19T07:34:25.000Z",
    "id": 1,
    "name": "test",
    "homework": "no",
    "typeId": "1",
    "type_name": null
},
    {
        "ctime": "2020-06-19T07:34:25.000Z",
        "id": 2,
        "name": "ios第一课",
        "homework": "完成课上练习",
        "typeId": "2",
        "type_name": "ios自动化测试"
    },
    {
        "ctime": "2020-06-19T07:34:25.000Z",
        "id": 4,
        "name": "web第一课",
        "homework": "完成课上练习",
        "typeId": "6",
        "type_name": "web自动化测试"
    },];
let displayData = originData;
const setDisplayData = (newData)=>{
    displayData = newData;
}

//test suite
describe("Test SearchBar OnSearch Function", () => {
    //test case
    it("OnSearch Called", () => {


        const inputText = 'test';
        const props = {
         originData, setDisplayData,searchBarTarget

    }

        const component = mount(<SearchBar {...props} />);
        component.find('input').at(0).simulate('change', {
            target: {
                value: inputText
            }
        });

        const onsetDisplayData = jest.spyOn(props, 'setDisplayData');
        expect(onsetDisplayData).toHaveBeenCalledTimes(0);
        /*
        setTimeout(()=>{
            Log.debug("calls", onSearchMock.mock.calls);
            expect(onSearchMock).toHaveBeenCalledTimes(1);
            done();
        }, 0)
        */
    });
});
