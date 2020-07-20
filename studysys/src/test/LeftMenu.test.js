import React from "react";
import Link from "next/link";

import { shallow, mount } from "enzyme";
import LeftMenu from "../component/global/LeftMenu";
import { Menu } from "antd";
import ControlOutlined from "@ant-design/icons/lib/icons/ControlOutlined";
const { SubMenu } = Menu;
/**
 * <LeftMenu location={location} locationString={locationString} />
 * @type {string}
 */

//test suite
describe("Test Left Menu Function", () => {
  const info = {
    role_id: 7,
    id: 16,
    email: "manager1111@manager.com",
    role: {
      id: 7,
      name: "test",
      menu: ["-course-edit", "-course-list", "-student-list", "-password"],
    },
  };

  let component;

  beforeAll(() => {
    const props = {
      location: ["course", "list"],
      locationString: "course list",
    };
    window.localStorage.setItem("info", JSON.stringify(info));
    component = mount(<LeftMenu {...props} />);
  });

  afterAll(() => {
    component.unmount();
  });
  //test case
  it("Left Menu has two categories", () => {
    // expect(component).toMatchSnapshot();
    expect(component.find(SubMenu)).toHaveLength(3);
  });

  it("Setting should be the last item in Left Menu", () => {
    const menu = component.find(SubMenu).at(2);
    const span = menu.findWhere((node) => {
      return (
        node.name() === "span" &&
        node.children().length === 1 &&
        node.text() === "Settings"
      );
    });
    const result = span.text();
    expect(result).toBe("Settings");
  });

  it("Left Menu has three sub categories", () => {
    // expect(component).toMatchSnapshot();
    expect(component.find(Link)).toHaveLength(4);
  });
});
