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
  },
];
export const studentRoutes = {
  key: "student",
  title: "学生管理",
  icon: () => <UserOutlined />,
  menuItems: [
    {
      key: "student list",
      category: "student",
      subcategory: "list",
      exact: true,
      title: "学生列表",
      icon: () => null,
    },
    {
      key: "student add",
      category: "student",
      subcategory: "add",
      exact: true,
      title: "新增学生",
      icon: () => null,
    },
  ],
};

export const courseRoutes = {
  key: "course",
  title: "课程管理",
  icon: () => <ReadOutlined />,
  menuItems: [
    {
      key: "course list",
      category: "course",
      subcategory: "list",
      exact: true,
      title: "课程列表",
      icon: () => null,
    },
    {
      key: "course add",
      category: "course",
      subcategory: "add",
      exact: true,
      title: "新增课程",
      icon: () => null,
    },
    {
      key: "course type",
      category: "course",
      subcategory: "type",
      exact: true,
      title: "课程类型",
      icon: () => null,
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
  ...courseRoutes.menuItems,
  // ...interviewRoutes.menuItems,
  // ...teacherRoutes.menuItems,
];
