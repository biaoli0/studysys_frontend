import React from "react";
import { HomeOutlined, UserOutlined, ReadOutlined } from "@ant-design/icons";
import Router from "next/router";
import { URL_TARGET } from "../../library/axios/UrlTarget";
import UserInfo from "../../library/UserInfo";
import { Log } from "../../library/Log";

const menuKeyToMenuItem = {
  "-student-list": {
    key: "student list",
    category: "student",
    subcategory: "list",
    exact: true,
    title: "Student List",
    icon: () => null,
  },
  "-student-edit": {
    key: "student add",
    category: "student",
    subcategory: "add",
    exact: true,
    title: "Add Student",
    icon: () => null,
  },
  "-student-selection": {
    key: "student selection",
    category: "student",
    subcategory: "selection",
    exact: true,
    title: "Selection",
    icon: () => null,
  },
  // course
  "-course-list": {
    key: "course list",
    category: "course",
    subcategory: "list",
    exact: true,
    title: "Course List",
    icon: () => null,
  },
  "-course-edit": {
    key: "course add",
    category: "course",
    subcategory: "add",
    exact: true,
    title: "Add Course",
    icon: () => null,
  },
  "-course-type-list": {
    key: "course type",
    category: "course",
    subcategory: "type",
    exact: true,
    title: "Course Type",
    icon: () => null,
  },
  // teacher
  "-teacher-list": {
    key: "teacher list",
    category: "teacher",
    subcategory: "list",
    exact: true,
    title: "Teacher List",
    icon: () => null,
  },
  // manager
  "-manager-list": {
    key: "manager list",
    category: "manager",
    subcategory: "list",
    exact: true,
    title: "Manager List",
    icon: () => null,
  },
  // role
  "-role-list": {
    key: "role list",
    category: "role",
    subcategory: "list",
    exact: true,
    title: "Role List",
    icon: () => null,
  },
  // settings
  // "-password",
};

function getCategory(categorykey) {
  switch (categorykey) {
    case "student":
      return {
        key: "student",
        title: "Students",
        icon: () => <UserOutlined />,
      };
    case "course":
      return {
        key: "course",
        title: "Course",
        icon: () => <ReadOutlined />,
      };
    case "teacher":
      return {
        key: "teacher",
        title: "Teachers",
        icon: () => <UserOutlined />,
      };
    case "manager":
      return {
        key: "manager",
        title: "Manager",
        icon: () => <UserOutlined />,
      };
    case "role":
      return {
        key: "role",
        title: "Role",
        icon: () => <UserOutlined />,
      };
  }
}

export const LeftMenuConfig = {
  get: () => {
    // const menu = UserInfo.getMenu();
    const menu = LeftMenuConfig.getList();
    let menusRoutes = [];
    if (menu) {
      menu.map((menukey) => {
        const categorykey = menukey.split("-")[1];
        let categoryIndex = menusRoutes.findIndex((element) => element.key === categorykey);
        if (categoryIndex === -1) {
          const newCategory = getCategory(categorykey);
          newCategory.menuItems = [];
          menusRoutes.push(newCategory);
          categoryIndex = menusRoutes.length - 1;
        }
        const menuItem = menuKeyToMenuItem[menukey];
        menusRoutes[categoryIndex].menuItems.push(menuItem);
      });
    }
    Log.print("menu");
    Log.print(menusRoutes);
    return menusRoutes;
  },

  getHome: () => {
    return [...homeRoutes];
  },

  getList: () => {
    return [
      "-student-list",
      "-student-edit",
      "-student-selection",
      // course
      "-course-list",
      "-course-edit",
      "-course-type-list",
      // teacher
      "-teacher-list",
      // manager
      "-manager-list",
      // role
      "-role-list",
      // settings
      // "-password",
    ];
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
