import React, { Component } from "react";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink
} from "reactstrap";
import { translate } from "common/methods/translations";

import { observer } from "mobx-react";
import { observable } from "mobx";
import styles from "./LoggedInPerson.module.scss";
import AuthService from "services/AuthService";

import CollaborativeSpaceStore from "stores/CollaborativeSpaceStore";
import CollectiviteAddressStore from "stores/CollectiviteAddressStore";
import ContactStore from "stores/ContactStore";
import ContractStore from "stores/ContractStore";
import CurrentUserStore from "stores/CurrentUserStore";
import GlobalSearchStore from "stores/GlobalSearchStore";
import MaterialStore from "stores/MaterialStore";
import PurchaseSlipStore from "stores/PurchaseSlipStore";
import RemovalMonthStore from "stores/RemovalMonthStore";
import RemovalStore from "stores/RemovalStore";
import UserStore from "stores/UserStore";

@observer
class LoggedInPerson extends Component {
  @observable dropdownUser = false;

  constructor() {
    super();
    this.toggleUser = this.toggleUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleUser() {
    this.dropdownUser = !this.dropdownUser;
  }

  logout() {
    const { history } = this.props;
    AuthService.logout();
    CollaborativeSpaceStore.elements = [];
    CollectiviteAddressStore.addresses = [];
    ContactStore.contacts = [];
    ContractStore.contracts = {};
    CurrentUserStore.currentUser = {};
    GlobalSearchStore.results = [];
    MaterialStore.materialData = [];
    PurchaseSlipStore.purchaseSlips = [];
    RemovalMonthStore.months = [];
    RemovalStore.removals = [];
    UserStore.users = [];

    history.push("/");
  }

  render() {
    const { closeSearch } = this.props;
    const { currentUser } = CurrentUserStore;
    if (!currentUser) return null;
    return (
      <div className={styles.LoggedInPersonContainer}>
        <div className={styles.Avatar}>
          <span>
            {currentUser.firstName && currentUser.firstName.charAt(0)}
            {currentUser.lastName && currentUser.lastName.charAt(0)}
          </span>
          {/*<Media src={Avatar}></Media>*/}
        </div>
        <Dropdown
          className={styles.UserDropdown}
          isOpen={this.dropdownUser}
          toggle={this.toggleUser}
          onClick={closeSearch}
        >
          <DropdownToggle
            caret
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.dropdownUser}
          >
            {translate("globals.header.welcome", {
              userName: currentUser.firstName
            })}
          </DropdownToggle>
          <DropdownMenu>
            <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
            <span>{currentUser.email}</span>
            <span>{currentUser.profile}</span>
            <div className={styles.ButtonsContainer}>
              <NavLink href="/myProfile/personalInformation">
                <Button className={styles.Edit} />
              </NavLink>
              <NavLink href="/myProfile/alerts">
                <Button className={styles.Alert} />
              </NavLink>
              <Button className={styles.Logout} onClick={this.logout} />
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default LoggedInPerson;
