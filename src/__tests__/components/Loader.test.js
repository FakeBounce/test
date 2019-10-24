import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import Loader from "components/Loader/Loader";

configure({ adapter: new Adapter() });

describe("Testing ContentTable component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters", () => {
    const wrapper = shallow(<Loader show />);
    expect(wrapper).toMatchSnapshot();
  });
});