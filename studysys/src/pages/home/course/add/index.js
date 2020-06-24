import React, { useState, useEffect } from "react";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import GlobalForm from "../../../../component/global/GlobalForm";
import {CourseAddConfig} from "../../../../config/course/CourseAddConfig";
import {Log} from "../../../../library/Log";
import { message } from "antd";

export default function CourseAdd() {
  const [courseTypeList, setCourseTypeList] = useState(null);
  useEffect(() => {
    api.getCourseTypeList().then((res) => {
      if (res) {
        setCourseTypeList(res);
      }
    });
  }, []);

  const onFinish=(values)=> {
    Log.print(values);
    api.addCourse(values["courseName"], values["courseType"]).then((isSuccess) => {
      if (isSuccess) {
        message.success("Course successfully added");
      } else message.error("Action is failed");
    });
  }

  return (
    <HomepageWrapper>
      <GlobalForm
        list={courseTypeList}
        itemkey={"id"}
        itemname={"name"}
        formConfig={CourseAddConfig}
        callBack={onFinish}
      />
    </HomepageWrapper>
  );
}
