import React from "react";
import { HomeOutlined, UserOutlined, ReadOutlined } from "@ant-design/icons";
import Router from "next/router";
import { URL_TARGET } from "../../library/axios/UrlTarget";
import { Log } from "../../library/Log";

export const LeftMenuConfig = {
  getAll: () => {
    const login_type = localStorage.getItem("login-type");
    if (login_type === "teacher")
      return [{ ...studentRoutesForTeacher }, { ...courseRoutesForTeacher }];
    else if (login_type === "student") return [{ ...studentRoutesForStudent }];
    else if (login_type === "manager")
      return [
        { ...teacherRoutesForManager },
        { ...studentRoutesForTeacher },
        { ...managerRoutesForManager },
      ];
    else Router.push(URL_TARGET.TEACHER_LOGIN);
  },

  getHome: () => {
    return [...homeRoutes];
  },
};

const homeRoutes = [
  {
    key: "0",
    path: "/home",
    exact: true,
    title: "Home",
    icon: () => <HomeOutlined />,
  },
];

const studentRoutesForTeacher = {
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

const studentRoutesForStudent = {
  key: "student",
  title: "Student",
  icon: () => <UserOutlined />,
  menuItems: [
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

const courseRoutesForTeacher = {
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

const teacherRoutesForManager = {
  key: "teacher",
  title: "Teachers",
  icon: () => <UserOutlined />,
  menuItems: [
    {
      key: "teacher list",
      category: "teacher",
      subcategory: "list",
      exact: true,
      title: "Teacher List",
      icon: () => null,
    },
  ],
};

const managerRoutesForManager = {
  key: "manager",
  title: "Manager",
  icon: () => <UserOutlined />,
  menuItems: [
    {
      key: "manager list",
      category: "manager",
      subcategory: "list",
      exact: true,
      title: "Manager List",
      icon: () => null,
    },
  ],
};