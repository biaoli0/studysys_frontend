import Blank from "../home/components/others/blank";
import StudentList from "../home/components/student/studentList";
import AddStudent from "../home/components/student/addStudent";
import ClassList from "../home/components/class/classList";
import AddClass from "../home/components/class/addClass";
import ClassCategory from "../home/components/class/classCategory";
import InterviewArrangement from "../home/components/interview/interviewArrangement";
import TeacherList from "../home/components/teacher/teacherList";
import AddTeacher from "../home/components/teacher/addTeacher";
import React from "react";
import { HomeOutlined, UserOutlined, ReadOutlined } from "@ant-design/icons";
import SolutionOutlined from "@ant-design/icons/lib/icons/SolutionOutlined";
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";

export const homeRoutes = [
  {
    key: "0",
    path: "/home",
    exact: true,
    title: "首页",
    icon: () => <HomeOutlined />,
    component: () => <Blank />,
  },
];
export const studentRoutes = {
  key: "sub1",
  title: "学生管理",
  icon: () => <UserOutlined />,
  menuItems: [
    {
      key: "sub1-0",
      category: "student",
      subcategory: "list",
      exact: true,
      title: "学生列表",
      icon: () => null,
      component: () => <StudentList />,
    },
    {
      key: "sub1-1",
      category: "student",
      subcategory: "add",
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
      key: "sub2-0",
      category: "class",
      subcategory: "list",
      exact: true,
      title: "课程列表",
      icon: () => null,
      component: () => <ClassList />,
    },
    {
      key: "sub2-1",
      category: "class",
      subcategory: "add",
      exact: true,
      title: "新增课程",
      icon: () => null,
      component: () => <AddClass />,
    },
    {
      key: "sub2-2",
      category: "class",
      subcategory: "category",
      exact: true,
      title: "课程类型",
      icon: () => null,
      component: () => <ClassCategory />,
    },
  ],
};
// export const interviewRoutes = {
//   key: "sub3",
//   title: "面试管理",
//   icon: () => <SolutionOutlined />,
//   menuItems: [
//     {
//       key: "sub3-0",
//       path: "/home/interview/arrangement",
//       exact: true,
//       title: "面试安排",
//       icon: () => null,
//       component: () => <InterviewArrangement />,
//     },
//   ],
// };
// export const teacherRoutes = {
//   key: "sub4",
//   title: "教师管理",
//   icon: () => <TeamOutlined />,
//   menuItems: [
//     {
//       key: "sub4-0",
//       path: "/home/teacher/teacherList",
//       exact: true,
//       title: "教师列表",
//       icon: () => null,
//       component: () => <TeacherList />,
//     },
//     {
//       key: "sub4-1",
//       path: "/home/teacher/addTeacher",
//       exact: true,
//       title: "添加教师",
//       icon: () => null,
//       component: () => <AddTeacher />,
//     },
//   ],
// };
export const routes = [
  ...homeRoutes,
  ...studentRoutes.menuItems,
  ...classRoutes.menuItems,
  // ...interviewRoutes.menuItems,
  // ...teacherRoutes.menuItems,
];