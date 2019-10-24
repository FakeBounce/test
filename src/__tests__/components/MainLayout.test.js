import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import MainLayout from "components/MainLayout/MainLayout";

configure({ adapter: new Adapter() });

describe("Testing MainLayout component", () => {
    it("renders as expected without parameters", () => {
        const wrapper = shallow(<MainLayout show />);
        expect(wrapper).toMatchSnapshot();
    });

    it("renders as expected with parameters", () => {
        const wrapper = shallow(<MainLayout show />);
        expect(wrapper).toMatchSnapshot();
    });
});
