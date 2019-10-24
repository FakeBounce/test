import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import PaprecLogo from "components/UpperBar/PaprecLogo/PaprecLogo";

configure({ adapter: new Adapter() });

describe("Testing PaprecLogo component", () => {
  it("renders as expected without param", () => {
    const wrapper = shallow(<PaprecLogo />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders as expected with param", () => {
    const wrapper = shallow(<PaprecLogo prapesHref={"https://google.fr"} />);
    expect(wrapper).toMatchSnapshot();
  });
});
