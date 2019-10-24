import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import ConfirmModal from "components/Modals/ConfirmModal/ConfirmModal";

configure({ adapter: new Adapter() });

const handleYes = jest.fn();
const handleNo = jest.fn();

const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  theme: "red",
  handleYesButtonClick: handleYes,
  handleNoButtonClick: handleNo,
  toggle: () => jest.fn()
};

describe("Testing ConfirmModal component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<ConfirmModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as closed)", () => {
    const wrapper = shallow(<ConfirmModal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as open)", () => {
    const wrapper = shallow(<ConfirmModal {...defaultTestingProps} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });

  it("behave correctly when calling props", () => {
    const wrapper = shallow(<ConfirmModal {...defaultTestingProps} />);

    wrapper.instance().yesButtonClick();
    expect(handleYes.mock.calls.length).toBe(1);
    wrapper.instance().noButtonClick();
    expect(handleNo.mock.calls.length).toBe(1);
  });

  it("behave correctly when props are invalid", () => {
    const wrapper = shallow(
      <ConfirmModal
        {...defaultTestingProps}
        handleYesButtonClick={true}
        handleNoButtonClick={true}
      />
    );
    try {
      wrapper.instance().yesButtonClick();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
      expect(e.message).toBe("handleYesButtonClick is not a function");
    }
    try {
      wrapper.instance().noButtonClick();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
      expect(e.message).toBe("handleNoButtonClick is not a function");
    }
  });
});
