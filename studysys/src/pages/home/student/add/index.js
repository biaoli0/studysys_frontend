import React, { useState, useEffect } from "react";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import GlobalForm from "../../../../component/global/GlobalForm";
import { Log } from "../../../../library/Log";
import { message } from "antd";
import {StudentAddConfig} from "../../../../config/student/StudentAddConfig";

export default function StudentAdd() {
  const [studentTypeList, setStudentTypeList] = useState(null);
  const [courseList, setCourseList] = useState(null);

  useEffect(() => {
    api.getStudentTypeList().then((res) => {
      if (res) {
        setStudentTypeList(res);
      }
    });
    api.getCourseList().then((res) => {
      if (res && res.hasOwnProperty("datas")) {
        setCourseList(res.datas);
      }
    });
  }, []);

  const onFinish = (values) => {
    Log.print(values);
    api
      .addStudent(
        values["name"],
        values["typeId"],
        values["courseId"],
        values["address"]
      )
      .then((isSuccess) => {
        if (isSuccess) {
          message.success("Student successfully added");
        } else message.error("Action is failed");
      });
  };

  return (
    <HomepageWrapper>
      <GlobalForm
        list={[studentTypeList, courseList]}
        itemkey={["id", "id"]}
        itemname={["name","name"]}
        formConfig={StudentAddConfig}
        callBack={onFinish}
      />{" "}
    </HomepageWrapper>
  );
}
