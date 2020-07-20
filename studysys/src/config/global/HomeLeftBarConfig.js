import React from "react";
import { HomeOutlined, UserOutlined, ReadOutlined } from "@ant-design/icons";
import Router from "next/router";
import { URL_TARGET } from "../../library/axios/UrlTarget";
import UserInfo from "../../library/UserInfo";
import { Log } from "../../library/Log";
import ControlOutlined from "@ant-design/icons/lib/icons/ControlOutlined";
import ContactsOutlined from "@ant-design/icons/lib/icons/ContactsOutlined";
import UsbOutlined from "@ant-design/icons/lib/icons/UsbOutlined";
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined";

const menuKeyToMenuItem = {
  dashboard: {
    key: "home",
    title: "Home",
    icon: () => <HomeOutlined />,
    children: {
      "-dashboard": {
        key: "home dashboard",
        category: "home",
        subcategory: "dashboard",
        exact: true,
        title: "Dashboard",
        icon: () => null,
      },
    },
  },
  student: {
    key: "student",
    title: "Students",
    icon: () => <TeamOutlined />,
    children: {
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
    },
  },
  course: {
    key: "course",
    title: "Course",
    icon: () => <ReadOutlined />,
    children: {
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
    },
  },
  teacher: {
    key: "teacher",
    title: "Teachers",
    icon: () => <UserOutlined />,
    children: {
      "-teacher-list": {
        key: "teacher list",
        category: "teacher",
        subcategory: "list",
        exact: true,
        title: "Teacher List",
        icon: () => null,
      },
    },
  },
  manager: {
    key: "manager",
    title: "Manager",
    icon: () => <UsbOutlined />,
    children: {
      "-manager-list": {
        key: "manager list",
        category: "manager",
        subcategory: "list",
        exact: true,
        title: "Manager List",
        icon: () => null,
      },
    },
  },
  role: {
    key: "role",
    title: "Role",
    icon: () => <ContactsOutlined />,
    children: {
      "-role-list": {
        key: "role list",
        category: "role",
        subcategory: "list",
        exact: true,
        title: "Role List",
        icon: () => null,
      },
    },
  },
  password: {
    key: "password",
    title: "Settings",
    icon: () => <ControlOutlined />,
    children: {
      "-password": {
        key: "setting password",
        category: "setting",
        subcategory: "password",
        exact: true,
        title: "Change Password",
        icon: () => null,
      },
    },
  },
};

function getCategory(categorykey) {
  const menu = { ...menuKeyToMenuItem[categorykey] };
  delete menu.children;
  return menu;
}
function getChildren(categorykey, nodekey) {
  const menu = menuKeyToMenuItem[categorykey];
  return menu.children[nodekey];
}

export const LeftMenuConfig = {
  get: () => {
    const menu = UserInfo.getMenu();
    // const menu = UserInfo.getAll();
    let menusRoutes = [];
    if (menu) {
      menu.map((menukey) => {
        const categorykey = menukey.split("-")[1];
        let categoryIndex = menusRoutes.findIndex(
          (element) => element.key === categorykey
        );
        if (categoryIndex === -1) {
          const newCategory = getCategory(categorykey);
          newCategory.menuItems = [];
          menusRoutes.push(newCategory);
          categoryIndex = menusRoutes.length - 1;
        }
        const menuItem = getChildren(categorykey, menukey);
        menusRoutes[categoryIndex].menuItems.push(menuItem);
      });
    }
    return menusRoutes;
  },
  getColor: (menukey) => {
    const category = menukey.split("-")[1];
    switch (category) {
      case "student":
        return "OLIVEDRAB";
      case "course":
        return "SALMON";
      case "teacher":
        return "LIGHTSLATEGREY";
      case "manager":
        return "REBECCAPURPLE";
      case "role":
        return "ORANGE";
      case "password":
        return "lightskyblue";
      case "dashboard":
        return "MEDIUMSPRINGGREEN";
    }
  },
  getName: (menukey) => {
    const category = menukey.split("-")[1];
    if (!menuKeyToMenuItem[category]) console.log(menukey);
    return menuKeyToMenuItem[category]["children"][menukey].title;
  },
  getList: () => {
    const treeNodes = [];
    for (const [key, menu] of Object.entries(menuKeyToMenuItem)) {
      let treeNode = { title: menu.title, value: key, children: [] };
      for (const [menukey, submenu] of Object.entries(menu.children)) {
        treeNode.children.push({ title: submenu.title, value: menukey });
      }
      treeNodes.push(treeNode);
    }
    return treeNodes;
  },
};
