import React, { Component } from "react";
import { Col } from "reactstrap";
import styles from "./NewPurchaseSlips.module.scss";
import { translate } from "common/methods/translations";

class NewPurchaseSlips extends Component {
  render() {
    const { numberOfNewPurchaseSlips } = this.props;
    return (
      <Col sm="4">
        <div className={`${styles.DashboardBox} ${styles.Box6}`}>
          <p>
            <span>
              <strong>{numberOfNewPurchaseSlips}</strong>
            </span>{" "}
            {translate("home.numberOfDocuments")}
          </p>
        </div>
      </Col>
    );
  }
}

export default NewPurchaseSlips;
