import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import Header from "elements/Header";

configure({ adapter: new Adapter() });

describe("Testing Header component", () => {
  it("renders as expected without children", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders as expected with children", () => {
    const wrapper = shallow(
      <Header>
        <span>Test</span>
      </Header>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
