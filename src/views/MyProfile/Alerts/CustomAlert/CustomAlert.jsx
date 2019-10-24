import React, {Component} from 'react';
import styles from './CustomAlert.module.scss';
import {Row, Col, Label} from "reactstrap";

class CustomAlert extends Component {

  render() {
    const {children} = this.props;
    return (
      <Row>
        <Col sm="6"><p>{children}</p></Col>
        <Col sm="6">
          <Label className={styles.Switch}>
            <input type="checkbox"/>{' '}
            <span className={styles.Slider}/>
          </Label>
        </Col>
      </Row>
    );
  }
}

export default CustomAlert;