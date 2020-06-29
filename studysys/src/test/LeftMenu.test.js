import React from "react";

import {shallow} from "enzyme";
import LeftMenuTestConfig from "./LeftMenuTestConfig";
import LeftMenu from "../component/global/LeftMenu";

/**
 * <LeftMenu location={location} locationString={locationString} />
 * @type {string}
 */

//test suite
describe("Test Left Menu Function", () => {
  //test case
  it("Left Menu render", () => {
    const props = {
      location: ["course", "list"],
      locationString: "course list",
      homeLeftBarConfig: LeftMenuTestConfig,
    };

    const component = shallow(<LeftMenu {...props} />);
    expect(component).toMatchSnapshot();
  });
});
