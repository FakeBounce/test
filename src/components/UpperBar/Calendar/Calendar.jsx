import React, { Component } from "react";
import styles from "./Calendar.module.scss";
import moment from "moment";

class Calendar extends Component {
  lowerCaseAllWordsExceptFirstLetters = string => {
    return string
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  render() {
    return (
      <div className={styles.CalendarContainer}>
        <div>
          <p>{moment().format("dddd")}</p>
          <p>
            {this.lowerCaseAllWordsExceptFirstLetters(
              moment().format("D MMMM YY")
            )}
          </p>
        </div>
      </div>
    );
  }
}
export default Calendar;
