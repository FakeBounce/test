import React, { Component } from "react";
import styles from "./SideMenu.module.scss";
import { Nav, NavItem, Media } from "reactstrap";
import { NavLink } from "react-router-dom";
import Logo from "assets/images/sidemenu/atome.svg";
import { translate } from "common/methods/translations";

import { PAPREC_SITE } from "common/consts/common.js";

class SideMenu extends Component {
  render() {
    const currentLanguage = localStorage.getItem("language");

    return (
      <div className={styles.SideMenuContainer}>
        <a href={PAPREC_SITE + currentLanguage} target="_blank">
          <Media object src={Logo} className={styles.Logo} />
        </a>
        <Nav className={styles.Nav}>
          <NavItem className={styles.NavItem}>
            <NavLink
              href={"/home"}
              to={"/home"}
              activeClassName={styles._active}
            >
              <div className={styles.Home} />
              {translate("globals.menu.home").toUpperCase()}
            </NavLink>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <NavLink
              href={"/myContracts"}
              to={"/myContracts"}
              activeClassName={styles._active}
            >
              <div className={styles.Contracts} />
              {translate("globals.menu.myContracts").toUpperCase()}
            </NavLink>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <NavLink
              href={"/myFiles"}
              to={"/myFiles"}
              activeClassName={styles._active}
            >
              <div className={styles.Files} />
              {translate("globals.menu.myFiles").toUpperCase()}
            </NavLink>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <NavLink
              href={"/myRemovals"}
              to={"/myRemovals"}
              activeClassName={styles._active}
            >
              <div className={styles.Truck} />
              {translate("globals.menu.myRemovals").toUpperCase()}
            </NavLink>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <NavLink
              href={"/myReports"}
              to={"/myReports"}
              activeClassName={styles._active}
            >
              <div className={styles.Report} />
              {translate("globals.menu.myReports").toUpperCase()}
            </NavLink>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <NavLink
              href={"/myCollaborativeSpace"}
              to={"/myCollaborativeSpace"}
              activeClassName={styles._active}
            >
              <div className={styles.Collab} />
              {translate("globals.menu.myCollaborativeSpace").toUpperCase()}
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
export default SideMenu;
