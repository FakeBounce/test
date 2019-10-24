import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import SelectModal from "components/Modals/SelectModal/SelectModal";

configure({ adapter: new Adapter() });

const handleSave = jest.fn();

const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  handleSaveButtonClick: handleSave,
  toggle: () => jest.fn()
};

describe("Testing SelectModal component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<SelectModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as closed)", () => {
    const wrapper = shallow(<SelectModal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as open)", () => {
    const wrapper = shallow(<SelectModal {...defaultTestingProps} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });

  it("behave correctly when calling props", () => {
    const wrapper = shallow(<SelectModal {...defaultTestingProps} />);

    wrapper.instance().saveButtonClick();
    expect(handleSave.mock.calls.length).toBe(1);
    // expect(handleYes.mock.calls.length).toBeCalledWith(false);
  });

  it("behave correctly when props are invalid", () => {
    const wrapper = shallow(
      <SelectModal {...defaultTestingProps} handleSaveButtonClick={true} />
    );
    try {
      wrapper.instance().saveButtonClick();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
      expect(e.message).toBe("handleSaveButtonClick is not a function");
    }
  });

  // @TODO Check if functions are used and test'em
});