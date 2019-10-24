import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import ErrorModal from "components/Modals/ErrorModal/ErrorModal";

configure({ adapter: new Adapter() });

const handleOk = jest.fn();

const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  handleOkButtonClick: handleOk,
  toggle: () => jest.fn()
};

describe("Testing ErrorModal component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<ErrorModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as closed)", () => {
    const wrapper = shallow(<ErrorModal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as open)", () => {
    const wrapper = shallow(<ErrorModal {...defaultTestingProps} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });

  it("behave correctly when calling props", () => {
    const wrapper = shallow(<ErrorModal {...defaultTestingProps} />);

    wrapper.instance().okButtonClick();
    expect(handleOk.mock.calls.length).toBe(1);
  });

  it("behave correctly when props are invalid", () => {
    const wrapper = shallow(
      <ErrorModal
        {...defaultTestingProps}
        handleOkButtonClick={true}
      />
    );
    try {
      wrapper.instance().okButtonClick();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
      expect(e.message).toBe("handleOkButtonClick is not a function");
    }
  });
});
