import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import LoggedInOnly from "components/LoggedInOnly";

configure({ adapter: new Adapter() });

describe("Testing LoggedInOnly component", () => {
  it("renders as expected", () => {
    const wrapper = shallow(<LoggedInOnly />);
    expect(wrapper).toMatchSnapshot();
  });
});
