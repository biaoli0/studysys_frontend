import React, { useState, useEffect } from "react";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import GlobalForm from "../../../../component/global/GlobalForm";
import { Log } from "../../../../library/Log";
import {Menu, message, Table} from "antd";
import {ColumnsConfig} from "../../../../config/student/StudentSelectionConfig";
import AddCourseTypeModalDialog from "../../../../component/course/AddCourseTypeModalDialog";
import {SelectCourseModalDialog} from "../../../../component/student/SelectCourseModalDialog";
import SearchBar from "../../../../component/global/SearchBar";

export default function StudentAdd() {

    const [current,setCurrent] = useState("list");
    const [list,setList] = useState(null);
    const [displayList,setDisplayList] = useState(null);
    const searchBarTarget = "student_name";

    useEffect(() => {
        api.getStudentCourseList().then((res) => {
            if (res) {
                const data = res.map((item, key) => ({
                    ...item,
                    key: key,
                    course_date: item.hasOwnProperty("course_date")?new Date(item["course_date"]).toLocaleDateString():"",
                }));
                setList(data);
                setDisplayList(data);
            }
        });
        // api.getCourseList().then((res) => {
        //     if (res) {
        //         setCourseList(res);
        //     }
        // });
    }, []);

    const state = {
        bordered: false,
        loading: false,
        pagination: { position: "bottom" },
        size: "default",
        title: undefined,
        showHeader: true,
        tableLayout: undefined,
        bottom: "bottomRight",
        scroll: { y: 400 },
    };

    const handleClick = e => {
        setCurrent(e.key);
    };

  return (
    <HomepageWrapper>
        <SelectCourseModalDialog />
        <SearchBar originData={list} setDisplayData={setDisplayList} searchBarTarget={searchBarTarget}/>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="list">
          List Mode
        </Menu.Item>
        <Menu.Item key="calendar">
          Calendar Mode
        </Menu.Item>
      </Menu>
        <Table {...state} columns={ColumnsConfig} dataSource={displayList} />

    </HomepageWrapper>
  );
}
