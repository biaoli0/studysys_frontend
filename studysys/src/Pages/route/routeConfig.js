import Home from "../home/home";
import StudentList from "../student/studentList";
import AddStudent from "../student/addStudent";
import ClassList from "../class/classList";
import AddClass from "../class/addClass";
import ClassCategory from "../class/classCategory";
import InterviewArrangement from "../interview/interviewArrangement";
import TeacherList from "../teacher/teacherList";
import AddTeacher from "../teacher/addTeacher";
import React from "react";
import { HomeOutlined, UserOutlined, ReadOutlined } from "@ant-design/icons";
import SolutionOutlined from "@ant-design/icons/lib/icons/SolutionOutlined";
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";

export const homeRoutes = [
  {
    path: "/home",
    exact: true,
    title: "首页",
    icon: () => <HomeOutlined />,
    component: () => <Home />,
  },
];
export const studentRoutes = {
  key: "sub1",
  title: "学生管理",
  icon: () => <UserOutlined />,
  menuItems: [
    {
      path: "/home/student/studentList",
      exact: true,
      title: "学生列表",
      icon: () => null,
      component: () => <StudentList />,
    },
    {
      path: "/home/student/addStudent",
      exact: true,
      title: "新增学生",
      icon: () => null,
      component: () => <AddStudent />,
    },
  ],
};

export const classRoutes = {
  key: "sub2",
  title: "课程管理",
  icon: () => <ReadOutlined />,
  menuItems: [
    {
      path: "/home/class/classList",
      exact: true,
      title: "课程列表",
      icon: () => null,
      component: () => <ClassList />,
    },
    {
      path: "/home/class/addClass",
      exact: true,
      title: "新增课程",
      icon: () => null,
      component: () => <AddClass />,
    },
    {
      path: "/home/class/classCategory",
      exact: true,
      title: "课程类型",
      icon: () => null,
      component: () => <ClassCategory />,
    },
  ],
};
export const interviewRoutes = {
  key: "sub3",
  title: "面试管理",
  icon: () => <SolutionOutlined />,
  menuItems: [
    {
      path: "/home/interview/arrangement",
      exact: true,
      title: "面试安排",
      icon: () => null,
      component: () => <InterviewArrangement />,
    },
  ],
};
export const teacherRoutes = {
  key: "sub4",
  title: "教师管理",
  icon: () => <TeamOutlined />,
  menuItems: [
    {
      path: "/home/teacher/teacherList",
      exact: true,
      title: "教师列表",
      icon: () => null,
      component: () => <TeacherList />,
    },
    {
      path: "/home/teacher/addTeacher",
      exact: true,
      title: "添加教师",
      icon: () => null,
      component: () => <AddTeacher />,
    },
  ],
};
export const routes = [
  ...homeRoutes,
  ...studentRoutes.menuItems,
  ...classRoutes.menuItems,
  ...interviewRoutes.menuItems,
  ...teacherRoutes.menuItems,
];
