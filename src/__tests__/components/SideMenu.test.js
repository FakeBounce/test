import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import SideMenu from "components/SideMenu/SideMenu";

configure({ adapter: new Adapter() });

describe("Testing SideMenu component", () => {
  it("renders as expected", () => {
    const wrapper = shallow(<SideMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
