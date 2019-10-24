import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import NewFolderModal from "components/Modals/NewFolderModal/NewFolderModal";

configure({ adapter: new Adapter() });

const handleYes = jest.fn();
const handleNo = jest.fn();

const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  handleYesButtonClick: handleYes,
  handleNoButtonClick: handleNo,
  toggle: () => jest.fn(),
  isRenaming: false
};

describe("Testing NewFolderModal component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<NewFolderModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as closed)", () => {
    const wrapper = shallow(<NewFolderModal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as open)", () => {
    const wrapper = shallow(<NewFolderModal {...defaultTestingProps} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as isRenaming)", () => {
    const wrapper = shallow(
      <NewFolderModal {...defaultTestingProps} isRenaming />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("behave correctly when calling props", () => {
    const wrapper = shallow(
      <NewFolderModal {...defaultTestingProps} currentName={"File"} />
    );

    wrapper.instance().saveButtonClick();
    expect(handleYes.mock.calls.length).toBe(1);
    // expect(handleYes.mock.calls.length).toBeCalledWith(false);

    wrapper.instance().cancelButtonClick();
    expect(handleNo.mock.calls.length).toBe(1);
    // expect(handleYes.mock.calls.length).toBeCalledWith(false);
  });

  it("behave correctly when props are invalid", () => {
    const wrapper = shallow(
      <NewFolderModal
        {...defaultTestingProps}
        currentName={"File"}
        handleYesButtonClick={true}
        handleNoButtonClick={true}
      />
    );
    try {
      wrapper.instance().saveButtonClick();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
      expect(e.message).toBe("handleYesButtonClick is not a function");
    }
    try {
      wrapper.instance().cancelButtonClick();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
      expect(e.message).toBe("handleNoButtonClick is not a function");
    }
  });

  // @TODO Try to access to wrapper to fullfill test
  it("behave correctly when updating state", () => {
    const wrapper = shallow(<NewFolderModal {...defaultTestingProps} />);

    wrapper.instance().handleFileNameChange("New name");
    expect(wrapper.state().fileName).toEqual("New name");
  });
});
