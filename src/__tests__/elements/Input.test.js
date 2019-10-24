import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import Input from "elements/Input/Input";

configure({ adapter: new Adapter() });
const handleInput = jest.fn();

describe("Testing Input component", () => {
  it("renders as expected", () => {
    const wrapper = shallow(<Input />);
    expect(wrapper).toMatchSnapshot();
  });
  it("functions behave correctly", () => {
    const wrapper = shallow(<Input inputValue={handleInput} />);
    wrapper.instance().handleInputChange({ target: { value: "test" } });
    expect(wrapper.instance().inputValue).toBe("test");
    expect(handleInput.mock.calls.length).toBe(1);
  });
});
