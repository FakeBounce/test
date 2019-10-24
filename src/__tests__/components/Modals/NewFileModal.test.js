import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import NewFileModal from "components/Modals/NewFileModal/NewFileModal";
import { Media } from "reactstrap";

configure({ adapter: new Adapter() });

const handleYes = jest.fn();
const handleNo = jest.fn();

const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  handleYesButtonClick: handleYes,
  handleNoButtonClick: handleNo,
  toggle: () => jest.fn()
};

describe("Testing NewFileModal component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<NewFileModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as closed)", () => {
    const wrapper = shallow(<NewFileModal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as open)", () => {
    const wrapper = shallow(<NewFileModal {...defaultTestingProps} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });

  it("behave correctly when calling props", () => {
    const wrapper = shallow(<NewFileModal {...defaultTestingProps} />);

    wrapper.instance().saveButtonClick();
    expect(handleYes.mock.calls.length).toBe(1);
    // expect(handleYes.mock.calls.length).toBeCalledWith(false);

    wrapper.instance().cancelButtonClick();
    expect(handleNo.mock.calls.length).toBe(1);
    // expect(handleYes.mock.calls.length).toBeCalledWith(false);
  });

  it("behave correctly when updating state", () => {
    const wrapper = shallow(<NewFileModal {...defaultTestingProps} />);

    wrapper.instance().onDrop([{ preview: "test.png", name: "Media" }]);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.contains(<Media src={"test.png"} />)).toBe(true);
  });

  it("behave correctly when updating state with wrong params", () => {
    const wrapper = shallow(<NewFileModal {...defaultTestingProps} />);

    wrapper.instance().onDrop([12]);
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().onDrop([{ wrong: true }]);
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().onDrop(12);
    expect(wrapper).toMatchSnapshot();
  });

  it("behave correctly when props are invalid", () => {
    const wrapper = shallow(
      <NewFileModal
        {...defaultTestingProps}
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
});
