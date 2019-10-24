import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import { translate } from "common/methods/translations";

import styles from "./SearchBox.module.scss";

@observer
class SearchBox extends Component {
  @observable searchInput = "";

  handleSearchChange = event => {
    const { searchedValue } = this.props;
    searchedValue(event.target.value);
    this.searchInput = event.target.value;
    this.handleSearch();
  };

  handleSearch = () => {
    const { requestSearch } = this.props;
    requestSearch();
  };

  onKeyPressEvent = e => {
    const { requestSearch, module } = this.props;
    if (e) {
      const key = e.which || e.keyCode;
      if (
        key === 13 &&
        (!module || (module === "globalSearch" && this.searchInput.length))
      ) {
        requestSearch();
      }
    }
  };

  render() {
    return (
      <div className={styles.SearchBox}>
        <InputGroup className={styles.SearchBoxInputGroup}>
          <Input
            placeholder={
              this.props.placeholder || translate("globals.header.search")
            }
            value={this.searchInput}
            onChange={this.handleSearchChange}
            onKeyPress={this.onKeyPressEvent}
            className={styles.SearchBoxInput}
          />
          <InputGroupAddon addonType="append">
            <Button
              disabled={
                this.props.module === "globalSearch" &&
                this.searchInput.length === 0
              }
              onClick={this.handleSearch}
            />
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
export default SearchBox;
