import React, { Component } from "react";
import { Col } from 'reactstrap';
import styles from './CompanyLogo.module.scss';

class CompanyLogo extends Component {
  render() {
    const { currentCollectivite } = this.props;
    return (
      <Col sm="12">
        <div className={`${styles.DashboardBox} ${styles.Box2}`}>
          <div className={styles.Avatar}>
            <img src={`data:image/png;base64, ${currentCollectivite.logo}`} alt="collectivite logo"/>
          </div>
          <p>{currentCollectivite.name}</p>
        </div>
      </Col>
    )
  }
}

export default CompanyLogo;
