import React, { Component } from "react";
import styles from "./MyReports.module.scss";
import MainLayout from "components/MainLayout/MainLayout.jsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.jsx";
import Header from "elements/Header";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import { translate } from "common/methods/translations";

import ReportStore from "stores/ReportStore";
import ContractStore from "stores/ContractStore";
import Loader from "components/Loader/Loader.jsx";
import Report1 from "./Reports/Report1/Report1.jsx";
import ContractSelectBar from "./ContractSelectBar/ContractSelectBar.jsx";
import ReactGA from "react-ga";

@observer
class MyReports extends Component {
  @observable actualSelectedFile = observable({});
  @observable datesInterval = observable({ from: null, to: null });
  @observable actualData = null;
  @observable actualPage = 1;
  @observable dataFromApi = null;
  @observable totalItemsCount = 0;
  @observable selectedTemplate = null;
  @observable loading = false;

  @observable selectedYear = new Date().getFullYear();
  @observable selectedMonth = 0;
  @observable contracts = [];
  @observable contractsData = [];

  async componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "MyReports"
    });

    ReactGA.event({
      category: `Global`,
      action: "MyReports"
    });

    this.loading = true;
    ContractStore.fetchContracts().then(contracts => {
      this.setState(state => ({
        ...state,
        contracts
      }));
    });
    this.loading = false;
  }

  constructor() {
    super();
    this.handleLoadReport = this.handleLoadReport.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.state = {
      showReport: false,
      data: [],
      dataContracts: [],
      dataContractsPreviousYear: [],
      dataContractsCurrentYear: [],
      contracts: []
    };
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  async getContractsData(contractList) {
    this.loading = true;
    let params;
    let paramsPreviousYear;
    let paramsCurrentYear;
    const y = this.selectedYear;
    const m = this.selectedMonth;
    if (this.selectedMonth === 0) {
      params = {
        pageNumber: 1,
        pageSize: 1000,
        searchExpressions: [
          'Date > "' + y + '-01-01"',
          'Date < "' + y + '-12-31"'
        ]
      };
      paramsPreviousYear = {
        pageNumber: 1,
        pageSize: 1000,
        searchExpressions: [
          'Date > "' + (y - 1) + '-01-01"',
          'Date < "' + (y - 1) + '-12-31"'
        ]
      };
      paramsCurrentYear = params;
    } else {
      const yearEnd = m === 1 ? y : y + 1;
      const monthEnd = m + 11 === 12 ? 12 : m - 1;
      const day = this.daysInMonth(monthEnd, yearEnd, 0);

      params = {
        pageNumber: 1,
        pageSize: 1000,
        searchExpressions: [
          'Date > "' + y + "-" + m + '-01"',
          'Date < "' + yearEnd + "-" + monthEnd + "-" + day + '"'
        ]
      };
      paramsPreviousYear = {
        pageNumber: 1,
        pageSize: 1000,
        searchExpressions: [
          'Date > "' + (y - 1) + "-" + m + '-01"',
          'Date < "' + (yearEnd - 1) + "-" + monthEnd + "-" + day + '"'
        ]
      };
      paramsCurrentYear = {
        pageNumber: 1,
        pageSize: 1000,
        searchExpressions: [
          'Date > "' + y + '-01-01"',
          'Date < "' + y + '-12-31"'
        ]
      };
    }

    const data = await ReportStore.fetchDataReports(params, contractList);
    const dataPrev = await ReportStore.fetchDataReports(
      paramsPreviousYear,
      contractList
    );
    const dataCurrent = await ReportStore.fetchDataReports(
      paramsCurrentYear,
      contractList
    );

    this.setState({
      dataContracts: data,
      dataContractsPreviousYear: dataPrev,
      dataContractsCurrentYear: dataCurrent
    });

    this.loading = false;
  }

  handleSearchPeriod = async (dateFrom, dateTo, contracts) => {
    this.loading = true;
    let params;

    let realDateFrom = null;
    let realDateTo = null;

    if (new Date(dateFrom) > new Date(dateTo)) {
      realDateFrom = dateTo;
      realDateTo = dateFrom;
    } else {
      realDateFrom = dateFrom;
      realDateTo = dateTo;
    }

    params = {
      pageNumber: 1,
      pageSize: 1000,
      searchExpressions: [
        'Date > "' + realDateFrom + '"',
        'Date < "' + realDateTo + '"'
      ]
    };

    const data = await ReportStore.fetchDataReports(params, contracts);

    this.setState({
      dataContracts: data,
      dataContractsPreviousYear: [],
      dataContractsCurrentYear: []
    });

    this.loading = false;
  };

  handleLoadReport(contractList) {
    this.setState({ data: contractList });
    this.getContractsData(contractList);
  }

  // async getDataFromApi() {
  //   const formatedDateFrom =
  //     this.datesInterval.from === null
  //       ? null
  //       : this.datesInterval.from.format("DD/MM/YYYY");
  //   const formatedDateTo =
  //     this.datesInterval.to === null
  //       ? null
  //       : this.datesInterval.to.format("DD/MM/YYYY");
  //   this.loading = true;
  //   this.dataFromApi = await ReportStore.fetchReports({
  //     dateFrom: formatedDateFrom,
  //     dateTo: formatedDateTo,
  //     page: this.actualPage || 1,
  //     template: this.selectedTemplate === "" ? null : this.selectedTemplate
  //   });
  //   this.actualData =
  //     this.dataFromApi && this.dataFromApi.items
  //       ? this.dataFromApi.items
  //       : null;
  //   this.totalItemsCount =
  //     this.dataFromApi && this.dataFromApi.totalItemsCount
  //       ? this.dataFromApi.totalItemsCount
  //       : 0;
  //   this.loading = false;
  // }

  changeMonth(monthIndex) {
    this.selectedMonth = monthIndex;
  }

  changeYear(year) {
    this.selectedYear = year;
  }

  render() {
    const breadcrumbElements = [
      { name: "home", href: "/home" },
      { name: "myReports", isActive: true }
    ];
    const {
      dataContracts,
      dataContractsPreviousYear,
      dataContractsCurrentYear,
      contracts
    } = this.state;

    return (
      <MainLayout {...this.props}>
        <Container fluid className={styles.MyReports}>
          <Breadcrumbs elements={breadcrumbElements} />
          <Header>{translate("globals.menu.myReports")}</Header>
          <div className={styles.reportContainer}>
            <ContractSelectBar
              onSelectMonth={this.changeMonth}
              onSelectYear={this.changeYear}
              onSearch={this.handleLoadReport}
              onSearchPeriod={this.handleSearchPeriod}
              contracts={contracts}
            />

            {dataContracts !== undefined && dataContracts.length > 0 && (
              <div className={styles.reportSelector}>
                <Nav tabs>
                  <NavItem>
                    <NavLink active>RAPPORT 1</NavLink>
                  </NavItem>
                </Nav>
              </div>
            )}

            {dataContracts !== undefined && dataContracts.length > 0 && (
              <Report1
                dataReport={dataContracts}
                dataReport2={dataContractsPreviousYear}
                dataReport3={dataContractsCurrentYear}
                year={this.selectedYear}
              />
            )}

            {(dataContracts === undefined || dataContracts.length === 0) &&
              !this.loading && (
                <p className={styles.noDataMessage}>Aucune donnée disponible</p>
              )}
          </div>
          <Loader show={this.loading} />
        </Container>
      </MainLayout>
    );
  }
}

export default MyReports;
