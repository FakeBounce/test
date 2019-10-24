import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import FormModal from "components/Modals/FormModal/FormModal";

configure({ adapter: new Adapter() });

const setClick = jest.fn();
const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  setClick,
  toggle: () => jest.fn()
};

// @TODO Add more tests
describe("Testing FormModal component", () => {
  it("renders as expected without parameters", () => {
    try {
      shallow(<FormModal />);
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
      expect(e.message).toBe("this.props.setClick is not a function");
    }
  });

  it("renders as expected with parameters (as closed)", () => {
    const wrapper = shallow(<FormModal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as open)", () => {
    const wrapper = shallow(<FormModal {...defaultTestingProps} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });
});
