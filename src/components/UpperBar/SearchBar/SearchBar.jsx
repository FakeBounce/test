import React, { Component } from "react";
import { translate } from "common/methods/translations";

import styles from "./SearchBar.module.scss";
import { Collapse, Input } from "reactstrap";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class SearchBar extends Component {
  @observable searchInput = "";

  constructor() {
    super();
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    if (event && event.target && event.target.value)
      this.searchInput = event.target.value;
  }

  onKeyPressEvent(e) {
    const { history } = this.props;
    const key = e.which || e.keyCode;
    if (key === 13 && this.searchInput !== "") {
      history.push(`/globalSearch?phrase=${this.searchInput}`);
    }
  }

  render() {
    const { isOpen } = this.props;
    return (
      <div className={styles.GlobalSearch}>
        <Collapse isOpen={isOpen}>
          <Input
            placeholder={translate("globals.header.search")}
            value={this.searchInput}
            onChange={this.handleSearchChange}
            onKeyPress={this.onKeyPressEvent.bind(this)}
            ref={input => input && input.focus()}
          />
        </Collapse>
      </div>
    );
  }
}

export default SearchBar;
