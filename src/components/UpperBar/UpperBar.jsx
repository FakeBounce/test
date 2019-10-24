import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import styles from "./UpperBar.module.scss";
import { Media } from "reactstrap";
import Search from "assets/images/search_icon.png";

import { PAPREC_SITE } from "common/consts/common";
import LoggedInPerson from "./LoggedInPerson/LoggedInPerson.jsx";
import PaprecLogo from "./PaprecLogo/PaprecLogo.jsx";
import Calendar from "./Calendar/Calendar.jsx";
import Help from "./Help/Help.jsx";
import SearchBar from "./SearchBar/SearchBar";
import { withRouter } from "react-router-dom";

@withRouter
@observer
class UpperBar extends Component {
  @observable dropDownSearchBar = false;
  @observable prapesHref = PAPREC_SITE + localStorage.getItem("language");

  constructor() {
    super();
    this.toggleSearch = this.toggleSearch.bind(this);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.collapseElementRef = React.createRef();
    this.searchButtonRef = React.createRef();
  }

  componentDidMount() {
    this.prapesHref = PAPREC_SITE + localStorage.getItem("language");
  }

  componentDidUpdate() {
    this.prapesHref = PAPREC_SITE + localStorage.getItem("language");
  }

  toggleSearch() {
    const { path } = this.props.match;
    if (path !== "/globalSearch") {
      this.dropDownSearchBar = !this.dropDownSearchBar;
    } else {
      this.dropDownSearchBar = false;
    }

    this.dropDownSearchBar
      ? document.addEventListener("click", this.handleOutsideClick, false)
      : document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleOutsideClick(event) {
    if (this.node && this.node.contains(event.target)) return;
    this.dropDownSearchBar = false;
  }

  render() {
    const { history } = this.props;
    return (
      <div
        className={styles.UpperBar}
        ref={node => {
          this.node = node;
        }}
      >
        <div className={styles.UpperBarContainer}>
          <Calendar />
          <LoggedInPerson history={history} />
          <div className={styles.SearchContainer} onClick={this.toggleSearch}>
            <Media src={Search} />
          </div>
          <Help />
          {/* <Language supportedLanguages={supportedLanguages}/> */}
          <PaprecLogo prapesHref={this.prapesHref} />
        </div>
        <SearchBar history={history} isOpen={this.dropDownSearchBar} />
      </div>
    );
  }
}

export default UpperBar;
