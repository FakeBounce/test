import React, { Component } from "react";
import { Container } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";

import Pagination from "react-js-pagination";

import MainLayout from "components/MainLayout/MainLayout.jsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.jsx";
import Header from "elements/Header";
import SearchBoxSmall from "../../components/SearchBoxSmall/SearchBoxSmall.jsx";
import DatePickerBox from "./DatePickerBox/DatePickerBox.jsx";
import ContentTable from "../../components/ContentTable/ContentTable.jsx";
import Loader from "components/Loader/Loader.jsx";
import styles from "./MyFiles.module.scss";
import PurchaseSlipService from "services/PurchaseSlipService";
import ReactGA from "react-ga";
import { translate } from "common/methods/translations";

@observer
class MyFiles extends Component {
  @observable searchValue = null;
  @observable datesInterval = observable({ from: null, to: null });
  @observable actualData = null;
  @observable dataFromApi = null;
  @observable actualPage = 1;
  @observable totalItemsCount = 0;
  @observable paginationDropdown = false;
  @observable hidePagination = false;
  @observable isLoading = false;

  constructor() {
    super();

    this.searchBoxValue = this.searchBoxValue.bind(this);
    this.requestSearch = this.requestSearch.bind(this);

    this.datePickerBoxValue = this.datePickerBoxValue.bind(this);
    this.requestDatePicker = this.requestDatePicker.bind(this);

    this.handlePaginationPageChange = this.handlePaginationPageChange.bind(
      this
    );
    this.togglePagination = this.togglePagination.bind(this);
    this.showPagination = this.showPagination.bind(this);
  }

  async componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "MyFiles"
    });

    ReactGA.event({
      category: `Global`,
      action: "MyFiles"
    });

    this.isLoading = true;
    this.dataFromApi = await PurchaseSlipService.getPurchaseSlips({
      pageNumber: 1,
      pageSize: 10
    });
    this.proceedWithData();
    this.isLoading = false;
  }

  async getDataFromApi() {
    const formatedDateFrom =
      this.datesInterval.from === null
        ? null
        : this.datesInterval.from.format("YYYY-MM-DD");
    const formatedDateTo =
      this.datesInterval.to === null
        ? null
        : this.datesInterval.to.format("YYYY-MM-DD");
    this.isLoading = true;
    const searchExpressions = [];
    if (formatedDateFrom) {
      searchExpressions.push(`Date >= "${formatedDateFrom}"`);
    }
    if (formatedDateTo) {
      searchExpressions.push(`Date <= "${formatedDateTo}"`);
    }
    if (this.searchValue) {
      searchExpressions.push(`Reference = "${this.searchValue}"`);
    }
    this.dataFromApi = await PurchaseSlipService.getPurchaseSlips({
      pageNumber: this.actualPage || 1,
      pageSize: 10,
      searchExpressions
    });
    this.proceedWithData();
    this.isLoading = false;
  }

  proceedWithData() {
    this.actualData =
      this.dataFromApi && this.dataFromApi.items
        ? this.dataFromApi.items
        : null;
    this.hidePagination = this.actualData.length <= 0;
    this.totalItemsCount =
      this.dataFromApi && this.dataFromApi.totalItemsCount
        ? this.dataFromApi.totalItemsCount
        : 0;
  }

  showPagination() {
    const itemsCountPerPage = 10;
    if (!this.hidePagination) {
      // const page = Math.ceil(this.totalItemsCount / itemsCountPerPage);
      return (
        <div className={styles.PaginationContainer}>
          {/* <div className={styles.PageInfo}>
            <span>{`${translate('globals.page')} ${this.actualPage}/${page}`}</span>
          </div> */}
          <Pagination
            activePage={this.actualPage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={this.totalItemsCount}
            pageRangeDisplayed={5}
            onChange={this.handlePaginationPageChange}
          />
        </div>
      );
    }
  }

  searchBoxValue(value) {
    this.searchValue = value;
  }

  requestSearch() {
    this.getDataFromApi();
  }

  datePickerBoxValue(datesInterval) {
    this.datesInterval = datesInterval;
  }

  requestDatePicker() {
    this.getDataFromApi();
  }

  handlePaginationPageChange(pageNumber) {
    this.actualPage = pageNumber;
    this.getDataFromApi();
  }

  togglePagination() {
    this.paginationDropdown = !this.paginationDropdown;
  }

  render() {
    const breadcrumbElements = [
      { name: "home", href: "/home" },
      { name: "myFiles", isActive: true }
    ];

    return (
      <MainLayout {...this.props}>
        <div className={styles.MyPurchaseSlips}>
          <Container fluid>
            <Breadcrumbs elements={breadcrumbElements} />
            <Header>{translate("globals.menu.myFiles")}</Header>
            <div className={styles.TopBar}>
              <DatePickerBox
                requestDatePickerSearch={this.requestDatePicker}
                searchedDatesInterval={this.datePickerBoxValue}
              />
              <SearchBoxSmall
                requestSearch={this.requestSearch}
                searchedValue={this.searchBoxValue}
                placeholder={translate("myFiles.searchPlaceholder")}
              />
            </div>
            <Loader show={this.loading} />
            <div className={styles.TypeFileBar}>
              <span className={styles._isActive}>
                {translate("myFiles.purchaseSlips")}
              </span>
            </div>
            {!this.loading && (
              <div className={styles.PurchaseSlipsTable}>
                <ContentTable dataToShow={this.actualData} />
              </div>
            )}
            {this.showPagination()}
          </Container>
        </div>
      </MainLayout>
    );
  }
}

export default MyFiles;
