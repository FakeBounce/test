import React, { Component } from 'react';
import styles from './DropDown.module.scss';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import { translate } from "common/methods/translations";


@observer
class DropDown extends Component {
  @observable dropdownOpen = false;

  constructor() {
    super();
    this.toggleDownloadDropDown = this.toggleDownloadDropDown.bind(this);
    this.dropdownChange = this.dropdownChange.bind(this);
  }

  toggleDownloadDropDown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  dropdownChange(state) {
    const { dropdownChange, type } = this.props;
    dropdownChange(type, state);
  }

  render() {
    return (
      <Dropdown
        isOpen={this.dropdownOpen}
        toggle={this.toggleDownloadDropDown}
      >
        <DropdownToggle className={styles.DropdownToggle}>
          {this.props.selectedState} ▼
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={this.dropdownChange(true)}
          >
            {translate('myProfile.alerts.allContracts')}
          </DropdownItem>
          <DropdownItem
            onClick={this.dropdownChange(false)}
          >
            {translate('myProfile.alerts.personalize')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default DropDown;
