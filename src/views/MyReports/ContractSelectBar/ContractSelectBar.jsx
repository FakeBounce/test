import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Select from "react-select";
import { translate } from "common/methods/translations";

import styles from "../../MyReports/ContractSelectBar/ContractSelectBar.module.scss";
import DatePickerBox from "../DatePickerBox/DatePickerBox";

//const monthList = ['Tous', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// const contratsMock = [
//     { value: '123', label:'123-Contrat PH'},
//     { value: '456', label:'456-Contrat PH'},
//     { value: '789', label:'789-Contrat PH'}
// ];

@observer
class ContractSelectBar extends Component {
  @observable dropdownYear = false;
  // @observable dropdownYearPeriod1 = false;
  // @observable dropdownYearPeriod2 = false;
  @observable dropdownMonth = false;
  // @observable dropdownMonthPeriod1 = false;
  // @observable dropdownMonthPeriod2 = false;
  // @observable dropdownDayPeriod1 = false;
  // @observable dropdownDayPeriod2 = false;
  @observable selectAll = false;
  @observable selectedYear = new Date().getFullYear();
  // @observable selectedYearPeriod1 = new Date().getFullYear() - 1;
  // @observable selectedYearPeriod2 = new Date().getFullYear();
  @observable datesInterval = observable({ from: null, to: null });
  @observable selectedMonth = 0;
  // @observable selectedMonthPeriod1 = 0;
  // @observable selectedMonthPeriod2 = 11;
  // @observable selectedDayPeriod1 = "01";
  // @observable selectedDayPeriod2 = "31";
  @observable selectedContracts = [];
  @observable months = [
    translate("myReports.months.all"),
    translate("myReports.months.january"),
    translate("myReports.months.february"),
    translate("myReports.months.march"),
    translate("myReports.months.april"),
    translate("myReports.months.may"),
    translate("myReports.months.june"),
    translate("myReports.months.july"),
    translate("myReports.months.august"),
    translate("myReports.months.september"),
    translate("myReports.months.october"),
    translate("myReports.months.november"),
    translate("myReports.months.december")
  ];
  // @observable monthsPeriod = [
  //   translate("myReports.months.january"),
  //   translate("myReports.months.february"),
  //   translate("myReports.months.march"),
  //   translate("myReports.months.april"),
  //   translate("myReports.months.may"),
  //   translate("myReports.months.june"),
  //   translate("myReports.months.july"),
  //   translate("myReports.months.august"),
  //   translate("myReports.months.september"),
  //   translate("myReports.months.october"),
  //   translate("myReports.months.november"),
  //   translate("myReports.months.december")
  // ];

  constructor(props) {
    super(props);
    this.toggleYearDropDown = this.toggleYearDropDown.bind(this);
    this.toggleMonthDropDown = this.toggleMonthDropDown.bind(this);
    this.changeSelectedMonth = this.changeSelectedMonth.bind(this);
    this.changeSelectedYear = this.changeSelectedYear.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.selectAllContracts = this.selectAllContracts.bind(this);
    this.state = {
      modalOpen: false,
      selectedOption: null
    };
  }

  async componentDidMount() {
    this.selectAllContracts();
    this.onClickSearch();
  }

  getContracts() {
    const { contracts } = this.props;
    const contractList = [];
    for (let i = 0; i < contracts.length; i++) {
      const contract = {
        value: contracts[i].number.toString(),
        label: "N° " + contracts[i].number + " - " + contracts[i].name
      };
      contractList.push(contract);
    }
    return contractList;
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  toggleYearDropDown() {
    this.dropdownYear = !this.dropdownYear;
  }

  togglePeriod = observable => () => {
    this[observable] = !this[observable];
  };

  updatePeriodSelection = (observable, value) => {
    this[observable] = value;
  };

  toggleMonthDropDown() {
    this.dropdownMonth = !this.dropdownMonth;
  }

  changeSelectedMonth(monthIndex) {
    this.selectedMonth = monthIndex;
  }

  changeSelectedYear(year) {
    this.selectedYear = year;
  }

  onClickSearch() {
    const { onSearch } = this.props;
    const { onSelectMonth } = this.props;
    const { onSelectYear } = this.props;
    const data = this.selectedContracts;

    onSelectMonth(this.selectedMonth);
    onSelectYear(this.selectedYear);
    onSearch(data);
  }

  daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  datePickerBoxValue = datesInterval => {
    this.datesInterval = datesInterval;
  };

  onClickSearchPeriod = () => {
    const { onSearchPeriod } = this.props;

    const formatedDateFrom =
      this.datesInterval.from === null
        ? null
        : this.datesInterval.from.format("YYYY-MM-DD");
    const formatedDateTo =
      this.datesInterval.to === null
        ? null
        : this.datesInterval.to.format("YYYY-MM-DD");
    onSearchPeriod(formatedDateFrom, formatedDateTo, this.selectedContracts);

    // Old method
    // const lastDayOfSecondPeriod = this.daysInMonth(
    //   this.selectedMonthPeriod2 + 1,
    //   this.selectedYearPeriod2,
    //   0
    // );
    // onSearchPeriod(
    //   `${this.selectedYearPeriod1}-${this.selectedMonthPeriod1 + 1}-${
    //     this.selectedDayPeriod1
    //   }`,
    //   `${this.selectedYearPeriod2}-${this.selectedMonthPeriod2 +
    //     1}-${lastDayOfSecondPeriod}`,
    //   this.selectedContracts
    // );
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.selectedContracts = selectedOption.map(function(item, index) {
      return item.value;
    });
    if (selectedOption.length === 0) this.selectAll = false;
  };

  selectAllContracts() {
    this.selectAll = !this.selectAll;
    const contrats = this.selectAll ? this.getContracts() : [];
    this.setState({ selectedOption: contrats });
    this.selectedContracts = contrats.map(function(item, index) {
      return item.value;
    });
  }

  render() {
    const currentYear = new Date().getFullYear();
    const { selectedOption } = this.state;
    const ctr = this.getContracts();

    return (
      <Fragment>
        <div className={styles.contratSelector}>
          <Button className={styles.btnBlue} onClick={this.toggleModal}>
            {translate("myReports.selectContracts")}
          </Button>
          <span className={styles.contractsNumber}>
            {selectedOption != null ? selectedOption.length + " " : 0 + " "}{" "}
            {translate("myReports.selectedContracts")}
          </span>
          <div className={styles.dropdownYearContainer}>
            <Dropdown
              isOpen={this.dropdownYear}
              toggle={this.toggleYearDropDown}
              size="sm"
            >
              <DropdownToggle caret className={styles.drop}>
                {translate("myReports.year")}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    this.changeSelectedYear(currentYear);
                  }}
                >
                  {currentYear}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.changeSelectedYear(currentYear - 1);
                  }}
                >
                  {currentYear - 1}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <span className={styles.contractsNumber}>{this.selectedYear}</span>
          <div className={styles.dropdownYearContainer}>
            <Dropdown
              isOpen={this.dropdownMonth}
              toggle={this.toggleMonthDropDown}
              size="sm"
            >
              <DropdownToggle caret className={styles.drop}>
                {translate("myReports.month")}
              </DropdownToggle>
              <DropdownMenu>
                {this.months.map((month, index) => {
                  return (
                    <DropdownItem
                      key={`month-dropdown-index-${index}`}
                      onClick={() => {
                        this.changeSelectedMonth(index);
                      }}
                    >
                      {month}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
          <span className={styles.contractsNumber}>
            {this.months[this.selectedMonth]}
          </span>

          <div className={styles.btnSearch} onClick={this.onClickSearch} />

          <Modal
            isOpen={this.state.modalOpen}
            toggle={this.toggleModal}
            centered
          >
            <ModalHeader toggle={this.toggleModal}>
              {translate("myReports.selectContractsModalTitle")}
            </ModalHeader>
            <ModalBody>
              <label className={styles.selectAll}>
                <input
                  type="checkbox"
                  onChange={this.selectAllContracts}
                  checked={this.selectAll}
                />
                {translate("myReports.selectAll")}
              </label>
              <Select
                options={ctr}
                value={selectedOption}
                onChange={this.handleChange}
                isMulti
                className={styles.contratMultiSelect}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={this.toggleModal}
                className={styles.btnBlue}
              >
                {translate("myReports.modalClose")}
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        <div className={styles.contratPeriodSelector}>
          <DatePickerBox
            requestDatePickerSearch={this.onClickSearchPeriod}
            searchedDatesInterval={this.datePickerBoxValue}
          />
        </div>
      </Fragment>
    );
  }
}

export default ContractSelectBar;
