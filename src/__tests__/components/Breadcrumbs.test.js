import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";

configure({ adapter: new Adapter() });

const breadcrumbElements = [
  { name: "home", href: "/home" },
  { name: "myProfile", isActive: true }
];

describe("Testing Breadcrumbs component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<Breadcrumbs />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders as expected with parameters", () => {
    const wrapper = shallow(<Breadcrumbs elements={breadcrumbElements} />);
    expect(wrapper).toMatchSnapshot();
  });
});
