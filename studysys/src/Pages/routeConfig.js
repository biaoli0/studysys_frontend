import Home from "./home/home";
import StudentList from "./student/studentList";
import AddStudent from "./student/addStudent";
import ClassList from "./class/classList";
import AddClass from "./class/addClass";
import ClassCategory from "./class/classCategory";
import InterviewArrangement from "./interview/interviewArrangement";
import TeacherList from "./teacher/teacherList";
import AddTeacher from "./teacher/addTeacher";
import React from "react";

export const homeRoutes = [
  {
    path: "/home",
    exact: true,
    title: "首页",
    component: () => <Home />,
  },
];
export const studentRoutes = [
  {
    path: "/student/studentList",
    exact: true,
    title: "学生列表",
    component: () => <StudentList />,
  },
  {
    path: "/student/addStudent",
    exact: true,
    title: "新增学生",
    component: () => <AddStudent />,
  },
];
export const classRoutes = [
  {
    path: "/class/classList",
    exact: true,
    title: "课程列表",
    component: () => <ClassList />,
  },
  {
    path: "/class/addClass",
    exact: true,
    title: "新增课程",
    component: () => <AddClass />,
  },
  {
    path: "/class/classCategory",
    exact: true,
    title: "课程类型",
    component: () => <ClassCategory />,
  },
];
export const interviewRoutes = [
  {
    path: "/interview/arrangement",
    exact: true,
    title: "面试安排",
    component: () => <InterviewArrangement />,
  },
];
export const teacherRoutes = [
  {
    path: "/teacher/teacherList",
    exact: true,
    title: "教师列表",
    component: () => <TeacherList />,
  },
  {
    path: "/teacher/addTeacher",
    exact: true,
    title: "添加教师",
    component: () => <AddTeacher />,
  },
];
export const routes = [
  ...homeRoutes,
  ...studentRoutes,
  ...classRoutes,
  ...interviewRoutes,
  ...teacherRoutes,
];
