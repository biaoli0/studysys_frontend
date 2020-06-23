import React, { useState, useEffect } from "react";
import { api } from "../../../../library/axios/Api";
import HomepageWrapper from "../../../../component/global/HomepageWrapper";
import SelectionGroup from "../../../../component/global/SelectionGroup";

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
      <SelectionGroup list={courseTypeList} itemkey={"id"} itemname={"name"} />
    </HomepageWrapper>
  );
}
