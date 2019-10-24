import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import LoggedInPerson from "components/UpperBar/LoggedInPerson/LoggedInPerson";

configure({ adapter: new Adapter() });

describe("Testing LoggedInPerson component", () => {
  it("renders as expected without params", () => {
    const wrapper = shallow(<LoggedInPerson />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with params", () => {
    const history = [];
    history.push("/home");
    const wrapper = shallow(<LoggedInPerson history={history} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("logout behave correctly", () => {
    const history = [];
    history.push("/home");
    history.push("/home/test");
    history.push("/home");
    const wrapper = shallow(<LoggedInPerson history={history} />);
    localStorage.setItem("jwt_token", "testToken");
    expect(localStorage.getItem("jwt_token")).toBe("testToken");
    wrapper.instance().logout();
    expect(history.length).toBe(4);
    expect(history[3]).toBe("/");
    expect(localStorage.getItem("jwt_token")).toBe(undefined);
  });
});
