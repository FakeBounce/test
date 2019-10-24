import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import moment from "moment";
import { translate } from "common/methods/translations";

import Header from "elements/Header";
import styles from "./RemovalsByMonths.module.scss";

@observer
class RemovalsByMonths extends Component {
  @observable activeElementIndex = "data-item-idex-0";
  @observable selectedYear;
  @observable dropdownYear = false;

  constructor(props) {
    super(props);
    this.selectedYear = new Date().getFullYear();
    this.toggleYearDropDown = this.toggleYearDropDown.bind(this);
    this.changeSelectedYear = this.changeSelectedYear.bind(this);
  }

  componentDidMount() {
    const { firstIndex } = this.props;
    this.activeElementIndex = `data-item-idex-${firstIndex}`;
  }

  changeSelectedYear(year) {
    const { selectYear } = this.props;
    this.selectedYear = year;
    selectYear(year);
  }

  toggleYearDropDown() {
    this.dropdownYear = !this.dropdownYear;
  }

  setSelectedElement(element, event) {
    const { selectedElement } = this.props;
    selectedElement(element);
    const index = event.currentTarget.getAttribute("data-item");
    this.activeElementIndex = index;
  }

  render() {
    const { months } = this.props;
    const year = new Date().getFullYear();

    return (
      <Col sm="2">
        <Header>{translate("globals.menu.myRemovals")}</Header>
        <div className={styles.pullLeft}>
          <div className={styles.dropdownYearContainer}>
            <Dropdown
              isOpen={this.dropdownYear}
              toggle={this.toggleYearDropDown}
              size="sm"
              direction="right"
            >
              <DropdownToggle caret className={styles.drop}>
                Année
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    this.changeSelectedYear(year);
                  }}
                >
                  {year}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.changeSelectedYear(year - 1);
                  }}
                >
                  {year - 1}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <span className={styles.displayedYear}>{this.selectedYear}</span>
        </div>
        <ListGroup className={styles.MonthList}>
          {months.map((month, index) => {
            return (
              <ListGroupItem
                key={index}
                tag="li"
                href="#"
                data-item={`data-item-idex-${index}`}
                onClick={event => {
                  this.setSelectedElement(month, event);
                }}
                disabled={month.weight === 0 ? true : false}
                className={month.weight === 0 ? styles.DisabledLi : ""}
                active={this.activeElementIndex === `data-item-idex-${index}`}
              >
                <div className={styles.Label}>
                  <span>
                    {moment(
                      `2018-${
                        String(month.month).length === 1
                          ? "0" + month.month
                          : month.month
                      }-01`
                    ).format("MMM")}
                  </span>
                  <span>{String(month.year).substr(2, 3)}</span>
                </div>
                <div className={styles.weight}>{`${month.weight}t`}</div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Col>
    );
  }
}
export default RemovalsByMonths;
