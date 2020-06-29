import React from "react";
import { Menu } from "antd";
import Link from "next/link";
const ROUTE_PATH = "home";
const { SubMenu } = Menu;

const renderMenu = (menu) => {
  return (
    <SubMenu
      key={menu.key}
      title={
        <span>
          <menu.icon />
          <span>{menu.title}</span>
        </span>
      }
    >
      {renderMenuItems(menu.menuItems)}
    </SubMenu>
  );
};

function renderMenuItems(menuItems) {
  return menuItems.map((menuItem) => (
    <Menu.Item key={menuItem.key}>
      <Link
        href={`/${ROUTE_PATH}/${menuItem.category}/${menuItem.subcategory}`}
      >
        <a>
          <menuItem.icon />
          <span>{menuItem.title}</span>
        </a>
      </Link>
    </Menu.Item>
  ));
}

export default function LeftMenu(props) {
  const { location, locationString, homeLeftBarConfig } = props;

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[locationString]}
      mode="inline"
      defaultOpenKeys={[location[2]]}
    >
      {renderMenuItems(homeLeftBarConfig.getHome())}
      {renderMenu(homeLeftBarConfig.getStudent())}
      {renderMenu(homeLeftBarConfig.getCourse())}
    </Menu>
  );
}
