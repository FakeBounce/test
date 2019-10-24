import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import SearchBoxSmall from "components/SearchBoxSmall/SearchBoxSmall";

configure({ adapter: new Adapter() });

const requestSearch = jest.fn();
const searchedValue = jest.fn();

const defaultTestingProps = {
    requestSearch,
    searchedValue,
    placeholder: "placeholder"
};

describe("Testing SearchBoxSmall component", () => {
    it("renders as expected without parameters", () => {
        const wrapper = shallow(<SearchBoxSmall />);
        expect(wrapper).toMatchSnapshot();
    });

    it("renders as expected with parameters", () => {
        const wrapper = shallow(<SearchBoxSmall {...defaultTestingProps} />);
        expect(wrapper).toMatchSnapshot();
    });

    it("behave correctly when validating form", () => {
        const wrapper = shallow(<SearchBoxSmall {...defaultTestingProps} />);

        wrapper.find("Button").simulate("click");
        expect(requestSearch.mock.calls.length).toBe(1);
    });

    // it("behave correctly when pressing key event (wrong module)", () => {
    //   const wrapper = shallow(
    //     <SearchBoxSmall {...defaultTestingProps} module="test" />
    //   );
    //
    //   wrapper.instance().onKeyPressEvent({ keyCode: 12 });
    //   // @TODO : check unexpected result of 1 call when all params are wrong
    //   expect(requestSearch.mock.calls.length).toBe(0);
    // });
    //
    // it("behave correctly when pressing key event (with module)", () => {
    //   const wrapper = shallow(
    //     <SearchBoxSmall {...defaultTestingProps} module="globalSearch" />
    //   );
    //
    //   wrapper.instance().handleSearchChange({ target: { value: "test" } });
    //   expect(searchedValue.mock.calls.length).toBe(1);
    //   // @TODO : check why function is already called 2times
    //   expect(requestSearch.mock.calls.length).toBe(1);
    //   wrapper.instance().onKeyPressEvent({ keyCode: 13 });
    //   expect(requestSearch.mock.calls.length).toBe(2);
    // });

    it("behave correctly when props are invalid", () => {
        const wrapper = shallow(
            <SearchBoxSmall {...defaultTestingProps} requestSearch={true} />
        );
        try {
            wrapper.instance().onKeyPressEvent({ keyCode: 13 });
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
            expect(e.message).toBe("requestSearch is not a function");
        }
    });
});
