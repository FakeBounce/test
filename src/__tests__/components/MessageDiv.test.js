import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import MessageDiv from "components/MessageDiv/MessageDiv";

configure({ adapter: new Adapter() });

describe("Testing MessageDiv component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<MessageDiv />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as simple div even with parameters", () => {
    const wrapper = shallow(
      <MessageDiv>
        <p>Test</p>
      </MessageDiv>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters", () => {
    const wrapper = shallow(
      <MessageDiv showElement styles={"test_classname"}>
        <p>Test</p>
      </MessageDiv>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
