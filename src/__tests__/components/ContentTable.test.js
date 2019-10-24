import React from "react";
import { shallow, configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import ContentTable from "components/ContentTable/ContentTable";

configure({ adapter: new Adapter() });

const dataToShow = [
  {
    date: new Date("December 17, 1995 03:24:00"),
    reference: "oui",
    amount: 35
  },
  { date: new Date("December 18, 1995 03:24:00"), reference: "non", amount: 53 }
];

// const singleRow = {
//   amount: 1291.15,
//   date: "2019-08-31T00:00:00",
//   pdfLink:
//     "7JoSwBYVKZOhdM1IRj//OXkBu46DvsaCsArJz7BD6DJX/lABK45akJHW74sBJT6Rv2tqnJ9tWwzadjlBs6VZ/cheB4tOmP6bN6nFC+bKefGhWAjWW/sowCkQ1HilM68aIFaSRDMlOmVheaGlJLzZPkU6qQZ3k9sWek1B33rNSgw0HrKRR3C9JuE0rWigrBjTWNr/zCumpYP/lSMm+xijejGpnrN1uGVa+NLPCJOz3V0=",
//   reference: "BBA190800105   "
// };

describe("Testing ContentTable component", () => {
  it("renders as expected without parameters", () => {
    const wrapper = shallow(<ContentTable />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with parameters", () => {
    const wrapper = shallow(<ContentTable dataToShow={dataToShow} />);
    expect(wrapper).toMatchSnapshot();
  });

  // Hard to simulate file download with current config
  // it("set state as expected", done => {
  //   const mockSuccessResponse = new Blob();
  //   const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  //   const mockFetchPromise = Promise.resolve({
  //     // 3
  //     json: () => mockJsonPromise
  //   });
  //
  //   global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  //
  //   jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise); // 4
  //
  //   const wrapper = shallow(<ContentTable dataToShow={[singleRow]} />); // 5
  //
  //   wrapper.instance().downloadFile(singleRow, "");
  //
  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   // expect(global.fetch).toHaveBeenCalledWith('https://url-of-your-server.com/example/json');
  //
  //   process.nextTick(() => {
  //     // 6
  //     // expect(wrapper.state()).toEqual({
  //     //   // ... assert the set state
  //     // });
  //
  //     global.fetch.mockClear(); // 7
  //     done(); // 8
  //   });
    // expect(wrapper).toMatchSnapshot();
  // });
});
