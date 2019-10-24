import React, { Component } from 'react';
import { Button, Label } from 'reactstrap';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { translate } from "common/methods/translations";


import styles from './DatePickerBox.module.scss';

@observer
class DatePickerBox extends Component {
  @observable datePickerDateFrom = null;
  @observable datePickerDateTo = null;

  constructor() {
    super();
    this.setDateFrom = this.setDateFrom.bind(this);
    this.setDateTo = this.setDateTo.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  setDateFrom(date) {
    this.datePickerDateFrom = date;
    this.handleDatePicker();
  }

  setDateTo(date) {
    this.datePickerDateTo = date;
    this.handleDatePicker();
  }

  handleDatePicker() {
    const { requestDatePickerSearch } = this.props;
    requestDatePickerSearch();
  }

  handleDateChange() {
    const { searchedDatesInterval } = this.props;
    searchedDatesInterval({ from: this.datePickerDateFrom, to: this.datePickerDateTo });
  }

  render() {
    return (
      <div className={styles.ButtonsBox}>
        {/* <Label>{translate('globals.from')}</Label> */}
        <DatePicker
          className={styles.BigInput}
          selected={this.datePickerDateFrom }
          onChange={this.setDateFrom}
          maxDate={this.datePickerDateTo}
          onBlur={this.handleDateChange}
          placeholderText={translate('globals.from')}
        />
        {/* <Label>{translate('globals.to')}</Label> */}
        <DatePicker
          className={styles.BigInput}
          selected={this.datePickerDateTo }
          onChange={this.setDateTo}
          minDate={this.datePickerDateFrom}
          onBlur={this.handleDateChange}
          placeholderText={translate('globals.to')}
        />
        {/* <Button onClick={this.handleDatePicker} size="lg">OK</Button>{' '} */}
      </div>
    );
  }
}
export default DatePickerBox;
