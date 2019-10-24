import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import Modal from "elements/Modal/Modal";

configure({ adapter: new Adapter() });

const defaultTestingProps = {
  isOpen: false,
  title: "Title",
  toggle: () => jest.fn(),
  file: null
};

describe("Testing Modal component", () => {
  it("renders as expected without params", () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders as expected with params (closed)", () => {
    const wrapper = shallow(<Modal {...defaultTestingProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders as expected with params (opened)", () => {
    const wrapper = shallow(<Modal {...defaultTestingProps} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });
});

