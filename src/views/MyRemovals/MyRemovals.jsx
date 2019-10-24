import React, { Component } from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Container, Row } from "reactstrap";

import MainLayout from "components/MainLayout/MainLayout.jsx";
import styles from "./MyRemovals.module.scss";

import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.jsx";

import RemovalsByMonths from "./RemovalsByMonths/RemovalsByMonths.jsx";
import RemovalsInSpecificMonth from "./RemovalsInSpecificMonth/RemovalsInSpecificMonth.jsx";
import Loader from "components/Loader/Loader.jsx";
import RemovalStore from "stores/RemovalStore";
import RemovalMonthStore from "stores/RemovalMonthStore";
import ReactGA from "react-ga";

@observer
class MyRemoval extends Component {
  @observable firstIndex = this.getLastMonth();
  @observable currentSelectedMonth = observable({
    dateFrom: moment(),
    dateTo: moment(),
    summary: 0,
    totalItemsCount: 0,
    actualPage: 1,
    removals: observable([]),
    setRemovals(removals) {
      this.removals = removals;
    }
  });

  @observable allMonths = []; //observable({});
  @observable loading = false;
  @observable displayedYear = new Date().getFullYear;
  @observable firstAvailableMonth;

  constructor() {
    super();
    this.selectedElement = this.selectedElement.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.selectYear = this.selectYear.bind(this);
  }
  getLastMonth = () => {
    const today = new Date();
    today.setDate(1);
    today.setMonth(today.getMonth() - 1);
    return today.getMonth();
  };

  async selectYear(year) {
    this.displayedYear = year;
    this.allMonths.length = 0;
    this.allMonths = await RemovalMonthStore.fetchMonths(year);
    this.firstIndex = this.allMonths.findIndex(month => month.weight > 0);
    // this.firstIndex = this.allMonths.findIndex(month => month.month >= moment().month()+1 && month.weight > 0 );
    if (this.firstIndex > -1) {
      const firstMonth = this.allMonths[this.firstIndex];
      this.currentSelectedMonth.summary = firstMonth.weight;
      this.currentSelectedMonth.dateFrom = `${firstMonth.year}-${
        firstMonth.month.length > 1 ? firstMonth.month : "0" + firstMonth.month
      }-01`;
      this.currentSelectedMonth.dateTo = `${firstMonth.year}-${
        firstMonth.month.length > 1 ? firstMonth.month : "0" + firstMonth.month
      }-31`;
      this.getRemovals();
    }
  }

  async componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "MyRemoval"
    });

    ReactGA.event({
      category: `Global`,
      action: "MyRemoval"
    });

    this.loading = true;
    this.allMonths = await RemovalMonthStore.fetchMonths(
      new Date().getFullYear()
    );
    this.firstIndex = this.getLastMonth();
    // this.firstIndex = this.allMonths.findIndex(month => month.month >= moment().month()+1 && month.weight > 0 );
    if (this.firstIndex > -1) {
      const firstMonth = this.allMonths[this.firstIndex];
      this.currentSelectedMonth.summary = firstMonth.weight;
      this.currentSelectedMonth.dateFrom = `${firstMonth.year}-${
        firstMonth.month.length > 1 ? firstMonth.month : "0" + firstMonth.month
      }-01`;
      this.currentSelectedMonth.dateTo = moment(
        this.currentSelectedMonth.dateFrom
      )
        .endOf("month")
        .format("YYYY-MM-DD");
      this.currentSelectedMonth.actualPage = 1;

      this.getRemovals();
    }
    this.loading = false;
  }

  selectedElement(element) {
    const { weight, year, month } = element;
    this.currentSelectedMonth.summary = weight;
    this.currentSelectedMonth.dateFrom = `${year}-${
      String(month).length > 1 ? month : "0" + month
    }-01`;
    this.currentSelectedMonth.dateTo = moment(
      this.currentSelectedMonth.dateFrom
    )
      .endOf("month")
      .format("YYYY-MM-DD");
    this.currentSelectedMonth.actualPage = 1;
    this.getRemovals();
  }

  async getRemovals() {
    this.loading = true;
    const { dateFrom, dateTo, actualPage } = this.currentSelectedMonth;
    const data = await RemovalStore.fetchRemovals({
      page: actualPage,
      pageNumber: actualPage,
      pageSize: 10,
      searchExpressions: [`Date >= "${dateFrom}"`, `Date <= "${dateTo}"`]
    });
    if (data) {
      this.currentSelectedMonth.setRemovals(data.removals);
      this.currentSelectedMonth.totalItemsCount = data.page.totalElements;
    }
    this.loading = false;
  }

  handlePage(page) {
    this.currentSelectedMonth.actualPage = page;
    this.getRemovals();
  }

  render() {
    const breadcrumbElements = [
      { name: "home", href: "/home" },
      { name: "myRemovals", isActive: true }
    ];

    return (
      <MainLayout {...this.props}>
        <div className={styles.MyRemovals}>
          <Container fluid>
            <Breadcrumbs elements={breadcrumbElements} />
            <Loader show={this.loading} />
            <Row>
              <RemovalsByMonths
                months={this.allMonths}
                selectedElement={this.selectedElement}
                firstIndex={this.firstIndex}
                selectYear={this.selectYear}
              />
              <RemovalsInSpecificMonth
                removalsInMonth={this.currentSelectedMonth}
                page={this.handlePage}
              />
            </Row>
          </Container>
        </div>
      </MainLayout>
    );
  }
}

export default MyRemoval;
