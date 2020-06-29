import React from "react";
import { HomeOutlined, UserOutlined, ReadOutlined } from "@ant-design/icons";

export default class LeftMenuTestConfig {
    static getAll() {
        return [
            ...homeRoutes,
            ...studentRoutes.menuItems,
            ...courseRoutes.menuItems,
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
