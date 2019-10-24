import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import App from "../App";

configure({ adapter: new Adapter() });

describe("Testing App component", () => {
  it("renders as expected", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
