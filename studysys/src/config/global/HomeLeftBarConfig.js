import React from "react";
import { HomeOutlined, UserOutlined, ReadOutlined } from "@ant-design/icons";
import SolutionOutlined from "@ant-design/icons/lib/icons/SolutionOutlined";
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";

export default class LeftMenuConfig {
  static getAll() {
    return [
      ...homeRoutes,
      ...studentRoutes.menuItems,
      ...courseRoutes.menuItems,
      // ...interviewRoutes.menuItems,
      // ...teacherRoutes.menuItems,
    ];
  }

  static getHome() {
    return [...homeRoutes];
  }

  static getStudent() {
    return { ...studentRoutes };
  }

  static getCourse() {
    return { ...courseRoutes };
  }
}

const homeRoutes = [
  {
    key: "0",
    path: "/home",
    exact: true,
    title: "Home",
    icon: () => <HomeOutlined />,
  },
];

const studentRoutes = {
  key: "student",
  title: "Students",
  icon: () => <UserOutlined />,
  menuItems: [
    {
      key: "student list",
      category: "student",
      subcategory: "list",
      exact: true,
      title: "Student List",
      icon: () => null,
    },
    {
      key: "student add",
      category: "student",
      subcategory: "add",
      exact: true,
      title: "Add Student",
      icon: () => null,
    },
    {
      key: "student selection",
      category: "student",
      subcategory: "selection",
      exact: true,
      title: "Selection",
      icon: () => null,
    },
  ],
};

const courseRoutes = {
  key: "course",
  title: "Course",
  icon: () => <ReadOutlined />,
  menuItems: [
    {
      key: "course list",
      category: "course",
      subcategory: "list",
      exact: true,
      title: "Course List",
      icon: () => null,
    },
    {
      key: "course add",
      category: "course",
      subcategory: "add",
      exact: true,
      title: "Add Course",
      icon: () => null,
    },
    {
      key: "course type",
      category: "course",
      subcategory: "type",
      exact: true,
      title: "Course Type",
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
