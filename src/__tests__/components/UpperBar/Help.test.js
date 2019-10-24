import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import Help from "components/UpperBar/Help/Help";

configure({ adapter: new Adapter() });

describe("Testing Help component", () => {
    it("renders as expected", () => {
        const wrapper = shallow(<Help />);
        expect(wrapper).toMatchSnapshot();
    });
});
