import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import Calendar from "components/UpperBar/Calendar/Calendar";

configure({ adapter: new Adapter() });

// Return a fixed timestamp when moment().format() is called
jest.mock("moment", () => () => ({ format: () => "2018–01–30" }));

describe("Testing Calendar component", () => {
  it("renders as expected", () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper).toMatchSnapshot();
  });
});
