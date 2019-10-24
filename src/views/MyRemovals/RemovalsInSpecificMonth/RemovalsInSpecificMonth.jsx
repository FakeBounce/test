import React, { Component } from 'react';
import { Table, Col } from 'reactstrap';
import moment from 'moment';
import { observer } from 'mobx-react';
import { translate } from "common/methods/translations";

import { observable } from "mobx";

import styles from './RemovalsInSpecificMonth.module.scss';
import Header from 'elements/Header';
import Pagination from "react-js-pagination";

@observer
class RemovalsInSpecificMonth extends Component {
  @observable actualPage = 1;

  constructor() {
    super();
    this.handlePaginationPageChange = this.handlePaginationPageChange.bind(this);
  }

  handlePaginationPageChange(pageNumber) {
    const { page } = this.props;
    page(pageNumber);
  }

  render() {
    const { removalsInMonth } = this.props;
    let formattedDate = '';
    if (removalsInMonth.removals.length) {
      formattedDate = moment(removalsInMonth.removals[0].date).format('MMMM YYYY');
    }
    // const itemsCountPerPage = 10;
    // const page = Math.ceil(removalsInMonth.totalItemsCount / itemsCountPerPage);
    return (
      <Col sm="10">
        <Header>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</Header>
        <div className={styles.DataBoxes}>
          <div className={styles.DataBox}>
            <h3>{removalsInMonth.summary}</h3>
            <span>{translate('myRemovals.tonsRemoved')}</span>
          </div>
          <div className={styles.DataBox}>
            <h3>{removalsInMonth.totalItemsCount}</h3>
            <span>{translate('myRemovals.removals')}</span>
          </div>
        </div>
        <div className={styles.TableContainer}>
          <Table className={styles.RemovalsTable}>
            <thead>
            <tr>
              <th>{translate('globals.date')}</th>
              <th>{translate('myRemovals.removalPlace')}</th>
              <th>{translate('myRemovals.type')}</th>
              <th>{translate('myRemovals.weight')}</th>
            </tr>
            </thead>
            <tbody>
            {removalsInMonth.removals.map((day, index) => {
              return (
                <tr key={index}>
                  <td>{moment(day.date).format("D/MM/YYYY")}</td>
                  <td>{day.location}</td>
                  <td>{day.type}</td>
                  <td>{`${Math.round(day.weight * 100) / 100}t`}</td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        </div>
        <div className={styles.PaginationContainer}>
          {/* <div className={styles.PageInfo}>
            <span>{`${translate('globals.page')} ${removalsInMonth.actualPage}/${page}`}</span>
          </div> */}
          <Pagination
            activePage={removalsInMonth.actualPage}
            itemsCountPerPage={10}
            totalItemsCount={removalsInMonth.totalItemsCount}
            pageRangeDisplayed={5}
            onChange={this.handlePaginationPageChange}
          />
        </div>
      </Col>
    );
  }
}

export default RemovalsInSpecificMonth;


