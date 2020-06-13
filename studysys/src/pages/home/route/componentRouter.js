import React from "react";
import AddClass from "../components/class/addClass";
import ClassCategory from "../components/class/classCategory";
import ClassList from "../components/class/classList";
import StudentList from "../components/student/studentList";
import ErrorPage from "../components/others/error-page";

const categories = {
  class: {
    add: <AddClass />,
    category: <ClassCategory />,
    list: <ClassList />,
  },
  student: { list: <StudentList /> },
};

function ComponentRouter(props) {
  let components = undefined;
  try {
    components = categories[props.category][props.subcategory];
  } catch (e) {
    components = <ErrorPage />;
  }
  return components;
}

export default ComponentRouter;
