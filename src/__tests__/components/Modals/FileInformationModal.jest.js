import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import FileInformationModal from "components/Modals/FileInformationModal/FileInformationModal";

configure({ adapter: new Adapter() });

const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  username: "Username",
  creationDate: new Date("2017-10-10"),
  lastUpdateDate: new Date("2017-10-10"),
  toggle: () => jest.fn()
};

describe("Testing FileInformationModal component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<FileInformationModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as closed)", () => {
    const wrapper = shallow(<FileInformationModal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters (as open)", () => {
    const wrapper = shallow(
      <FileInformationModal {...defaultTestingProps} isOpen />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
