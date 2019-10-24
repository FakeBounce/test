import React, { Component } from "react";
import qs from "query-string";
import styles from "./GlobalSearch.module.scss";
import MainLayout from "components/MainLayout/MainLayout.jsx";
import GlobalSearchStore from "stores/GlobalSearchStore.js";
import SearchHeader from "./SearchHeader/SearchHeader.jsx";
import FileList from "./FileList/FileList.jsx";
import ContractList from "views/MyContracts/Contracts/ContractList/ContractList.jsx";
import SearchBox from "components/SearchBox/SearchBox.jsx";
import ContentTable from "components/ContentTable/ContentTable.jsx";
import Loader from "components/Loader/Loader.jsx";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { translate } from "common/methods/translations";


import ReactGA from "react-ga";

@observer
class GlobalSearch extends Component {
  @observable purchaseSlipResults = [];
  @observable collaborativeSpaceResults = [];
  @observable contractResults = [];
  @observable numberOfResults = "";
  @observable searchValue = "";
  @observable searchTitleValue = "";
  @observable ascSort = false;
  @observable loading = false;

  constructor() {
    super();
    this.destructureData = this.destructureData.bind(this);
    this.switchSort = this.switchSort.bind(this);
    this.searchBoxValue = this.searchBoxValue.bind(this);
    this.requestSearch = this.requestSearch.bind(this);
  }

  async componentDidMount() {
    const { location, collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "GlobalSearch"
    });

    ReactGA.event({
      category: `Global`,
      action: "GlobalSearch"
    });

    const { phrase } = qs.parse(location.search);
    this.searchValue = phrase;
    this.searchTitleValue = phrase;
    if (phrase) {
      const searchResults = await GlobalSearchStore.fetchResults({
        phrase: phrase
      });
      this.destructureData(searchResults);
    }
  }

  searchBoxValue(value) {
    this.searchValue = value;
  }

  async requestSearch() {
    window.history.pushState(
      {},
      document.title,
      `/globalSearch?phrase=${this.searchValue}`
    );
    this.loading = true;
    const searchResults = await GlobalSearchStore.fetchResults({
      phrase: this.searchValue
    });
    this.destructureData(searchResults);
    this.searchTitleValue = this.searchValue;
    this.loading = false;
  }

  switchSort() {
    this.ascSort = !this.ascSort;
    this.getSortedData(this.ascSort ? "ASC" : "DESC");
  }

  async getSortedData(sortType) {
    this.loading = true;
    const searchResults = await GlobalSearchStore.fetchResults({
      phrase: this.searchValue,
      order: sortType
    });
    this.destructureData(searchResults);
    this.loading = false;
  }

  destructureData(searchResults) {
    this.purchaseSlipResults = searchResults["MyPurchaseSlips"] || [];
    this.collaborativeSpaceResults =
      searchResults["MyCollaborativeSpace"] || [];
    this.contractResults = searchResults["MyContracts"] || [];
    this.numberOfResults =
      this.purchaseSlipResults.length +
      this.collaborativeSpaceResults.length +
      this.contractResults.length;
  }

  render() {
    const { history } = this.props;
    return (
      <MainLayout {...this.props}>
        <div className={styles.TopBar}>
          <SearchBox
            requestSearch={this.requestSearch}
            searchedValue={this.searchBoxValue}
            placeholder={translate("searchPage.newSearch")}
            module="globalSearch"
          />
        </div>
        <p className={styles.SearchResult}>
          {translate("searchPage.numberOfResults", {
            numberOfResults: this.numberOfResults
          })}
          <span className={styles.SearchPhrase}>{this.searchTitleValue}</span> :
        </p>
        <div className={styles.SearchList}>
          <div className={styles.SortContainer}>
            <span>{`${this.numberOfResults} éléments`}</span>
            <span className={styles.ClickTextCursor} onClick={this.switchSort}>
              {translate("globals.sortBy")}
              {` ${this.ascSort ? "Z - A" : "A - Z"}`}
            </span>
          </div>
          <Loader show={this.loading} />
          <div className={styles.Container} />
          <SearchHeader
            show={this.purchaseSlipResults.length <= 0}
            text={`${translate("searchPage.resultsPer", {
              numberOfParticularTypeResults: this.purchaseSlipResults.length
            })}`}
            searchView={`${translate("globals.menu.myPurchaseSlips")}`}
          />
          <ContentTable dataToShow={this.purchaseSlipResults} />
          <SearchHeader
            show={this.contractResults.length <= 0}
            text={`${translate("searchPage.resultsPer", {
              numberOfParticularTypeResults: this.contractResults.length
            })}`}
            searchView={`${translate("globals.menu.myContracts")}`}
          />
          <ContractList contractList={this.contractResults} />
          <SearchHeader
            show={this.collaborativeSpaceResults.length <= 0}
            text={`${translate("searchPage.resultsPer", {
              numberOfParticularTypeResults: this.collaborativeSpaceResults
                .length
            })}`}
            searchView={`${translate("globals.menu.myCollaborativeSpace")}`}
          />
          <FileList
            history={history}
            fileList={this.collaborativeSpaceResults}
            sortAsc={this.sortData}
          />
        </div>
      </MainLayout>
    );
  }
}

export default GlobalSearch;
