import React, { Component } from "react";
import { Col } from 'reactstrap';
import styles from './Tonnage.module.scss';
import { translate } from "common/methods/translations";

class Tonnage extends Component {
  render() {
    const { annualWeight } = this.props;
    return (
      <Col sm="12">
        <div className={`${styles.DashboardBox} ${styles.Box3}`}>
          <p>{translate('home.annualTonsCollectedStart')}
            <span><strong>{annualWeight}</strong></span> {translate('home.annualTonsCollectedEnd')}</p>
        </div>
      </Col>
    )
  }
}

export default Tonnage;
