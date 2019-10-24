import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import PermissionsModal from "components/Modals/PermissionsModal/PermissionsModal";

configure({ adapter: new Adapter() });

const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  toggle: () => jest.fn(),
  file: null
};

describe("Testing PermissionsModal component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<PermissionsModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as closed)", () => {
    const wrapper = shallow(<PermissionsModal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as open)", () => {
    const wrapper = shallow(
      <PermissionsModal {...defaultTestingProps} isOpen />
    );
    expect(wrapper).toMatchSnapshot();
  });

  // @TODO Add tests for functions
});
