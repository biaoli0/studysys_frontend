import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SelectionGroup from "../../../../component/global/SelectionGroup";
import {Log} from "../../../../library/Log";

const { Option } = Select;

export default function CourseAdd() {
  const [courseTypeList, setCourseTypeList] = useState(null);

  useEffect(() => {
    api.getCourseTypeList().then((res) => {
      if (res) {
        setCourseTypeList(res);
      }
    });
  }, []);


  return (
    <HomepageWrapper>
<SelectionGroup list = {courseTypeList} itemkey={"name"}/>
    </HomepageWrapper>
  );
}
