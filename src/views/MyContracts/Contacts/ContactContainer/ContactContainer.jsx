import React, { Component } from 'react';
import styles from './ContactContainer.module.scss';
import { Col } from 'reactstrap';

class ContactContainer extends Component {
  render() {
    const item = this.props.item;
    return (
      <Col sm="3">
        <div className={styles.TabBox}>
          <div className={styles.Header}>
            <h4>{item.type}</h4>
          </div>
          <div className={styles.GrayRow}>
            <span>
              {item.firstName} {item.lastName}
            </span>
          </div>
          <div className={styles.GrayRow}>
            <span>
              {item.email}
              </span>
          </div>
          <div className={styles.GrayRow}>
            <span>
              {item.number}
            </span>
          </div>
        </div>
      </Col>
    );
  }
}

export default ContactContainer;
