import React, { Component } from 'react';
import styles from './Help.module.scss';
import { Button } from 'reactstrap';
import { translate } from "common/methods/translations";


class Help extends Component {

  render() {
    return (
      <div className={styles.HelpContainer}>
        <Button className={styles.HelpButton} color="link">{translate('globals.header.help')}</Button>
      </div>
    );
  }
}
export default Help;
