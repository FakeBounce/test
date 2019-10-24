import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import SearchBar from "components/UpperBar/SearchBar/SearchBar";

configure({ adapter: new Adapter() });

describe("Testing SearchBar component", () => {
  it("renders as expected without params", () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with params", () => {
    const history = [];
    history.push("/home");
    const wrapper = shallow(<SearchBar history={history} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });

  it("functions behave correctly", () => {
    const history = [];
    history.push("/home");
    history.push("/home/test");
    history.push("/home");
    const wrapper = shallow(<SearchBar history={history} />);
    expect(history.length).toBe(3);
    wrapper.instance().handleSearchChange({ target: { value: "yes" } });
    wrapper.instance().onKeyPressEvent({ keyCode: 13 });
    expect(history.length).toBe(4);
    expect(history[3]).toBe("/globalSearch?phrase=yes");
  });
});
