import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { setMomentGlobalLang } from "common/methods/momentGlobals";
import getLocalDateRepresentation from "common/methods/GetLocalDateRepresentation";
import styles from "./Language.module.scss";

@observer
class Language extends Component {
  @observable dropdownLanguage = false;
  @observable dropDownSearchBar = false;
  @observable currentLanguage = localStorage.getItem("language");

  constructor() {
    super();
    this.toggleLanguageDropDown = this.toggleLanguageDropDown.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  getDateInLocale(lng) {
    const { weekday, month, year, day } = getLocalDateRepresentation(
      lng,
      true,
      true
    );

    return {
      weekday,
      date: `${day} ${month.toUpperCase()} ${year}`
    };
  }

  toggleLanguageDropDown() {
    this.dropdownLanguage = !this.dropdownLanguage;
  }

  changeLanguage(lng) {
    this.currentLanguage = lng.toUpperCase();
    setMomentGlobalLang(lng);
    localStorage.setItem("language", lng);
  }

  render() {
    const { supportedLanguages, closeSearch } = this.props;
    return (
      <div className={styles.LanguagesContainer}>
        <Dropdown
          className={styles.LanguageDropdown}
          isOpen={this.dropdownLanguage}
          toggle={this.toggleLanguageDropDown}
          onClick={closeSearch}
        >
          <DropdownToggle
            caret
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.dropdownLanguage}
          >
            {this.currentLanguage}
          </DropdownToggle>
          <DropdownMenu>
            {supportedLanguages.map((lang, index) => {
              return (
                <DropdownItem
                  key={`languages-dropdown-index-${index}`}
                  onClick={() => {
                    this.changeLanguage(lang.toLowerCase());
                  }}
                >
                  {lang.toUpperCase()}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default Language;
