import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import ImageModal from "components/Modals/ImageModal/ImageModal";

configure({ adapter: new Adapter() });

const handleYes = jest.fn();
const handleNo = jest.fn();
const setEditor = jest.fn();

const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  handleYesButtonClick: handleYes,
  handleNoButtonClick: handleNo,
  setEditorRef: setEditor,
  toggle: () => jest.fn()
};

describe("Testing ImageModal component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<ImageModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as closed)", () => {
    const wrapper = shallow(<ImageModal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as open)", () => {
    const wrapper = shallow(<ImageModal {...defaultTestingProps} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });

  it("behave correctly when calling props", () => {
    const wrapper = shallow(<ImageModal {...defaultTestingProps} />);

    wrapper.instance().saveButtonClick();
    expect(handleYes.mock.calls.length).toBe(1);
      // expect(handleYes.mock.calls.length).toBeCalledWith(false);
  });

  it("behave correctly when props are invalid", () => {
      // @TODO how can we check setEditorRef as it doesn't throw an error ?
    const wrapper = shallow(
      <ImageModal
        {...defaultTestingProps}
        handleYesButtonClick={true}
        handleNoButtonClick={true}
        setEditorRef={true}
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
