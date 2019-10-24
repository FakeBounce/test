import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import Select from "elements/Select/Select";

configure({ adapter: new Adapter() });
const selectedOption = jest.fn();

describe("Testing Select component", () => {
  it("renders as expected without props", () => {
    const wrapper = shallow(<Select />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders as expected with props", () => {
    const wrapper = shallow(
      <Select setOptions={[{ name: "1", value: 1 }, { name: "2", value: 2 }]} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("functions behave correctly", () => {
    const wrapper = shallow(<Select selectedOption={selectedOption} />);
    wrapper.instance().handleChange({ target: { value: "test" } });
    expect(wrapper.instance().selectedElement).toBe("test");
    expect(selectedOption.mock.calls.length).toBe(1);
  });
});
