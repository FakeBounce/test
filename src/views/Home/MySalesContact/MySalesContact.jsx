import React, { Component } from "react";
import { Col } from 'reactstrap';
import styles from './MySalesContact.module.scss';
import { translate } from "common/methods/translations";

class MySalesContact extends Component {
  render() {
    const { contacts } = this.props;
    return (
      <Col sm="8">
        <div className={`${styles.DashboardBox} ${styles.Box5}`}>
          <h4>{translate('home.mySalesContact')}</h4>
          {contacts.map((contact, i) => {
            return (
              <div key={i}>
                <span>{`${contact.prenom} ${contact.nom}`}</span>
                <span>{contact.email}</span>
                <span>{contact.mobile}</span>
                <hr hidden={i === contacts.length - 1}/>
              </div>

            )
          })}
        </div>
      </Col>
    )
  }
}

export default MySalesContact;
