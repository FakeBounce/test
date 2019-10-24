import React, { Component } from 'react';
import styles from './SecondStage.module.scss';
import { Input, Button, InputGroup, Label } from 'reactstrap';

import { translate } from "common/methods/translations";
import { observable } from 'mobx';

class SecondStage extends Component {
  @observable siegeSocialAddress = {}

  constructor(props) {
    super(props);
    this.siegeSocialAddress = this.props.siegeSocialAddress;
    this.nextPageHandler = this.nextPageHandler.bind(this);
    this.previousPageHandler = this.previousPageHandler.bind(this);
  }

  nextPageHandler() {
    const { changeStage } = this.props;
    // TODO add validation and store for inputs
    changeStage(+1);
  }

  previousPageHandler() {
    const { changeStage } = this.props;
    changeStage(-1);
  }

  render() {
    return (
      <div className={styles.Container}>
        <span>{translate('firstLoginPage.headquarters')}</span>
        <InputGroup className={styles.DisabledGroup}>         
          <Input
            disabled
            type="text"
            placeholder={this.siegeSocialAddress.address_1}/>
          <Label>{translate('firstLoginPage.street')}</Label>
        </InputGroup>
        {/* <InputGroup className={styles.DisabledGroup}>         
          <Input
            disabled
            type="text"
            placeholder=''/>
          <Label>{translate('firstLoginPage.postalBox')}</Label>
        </InputGroup> */}
        <InputGroup className={styles.DisabledGroup}>         
          <Input
            disabled
            type="text"
            placeholder={this.siegeSocialAddress.postalCode}/>
          <Label>{translate('firstLoginPage.postalCode')}</Label>
        </InputGroup>
        <InputGroup className={styles.DisabledGroup}>         
          <Input
            disabled
            type="text"
            placeholder={this.siegeSocialAddress.city}/>
          <Label>{translate('firstLoginPage.city')}</Label>
        </InputGroup>
        <div className={styles.ButtonsContainer}>
          <Button className={styles.BackButton} onClick={this.previousPageHandler}>{translate('globals.return').toUpperCase()}</Button>
          <Button onClick={this.nextPageHandler}>{translate('globals.next').toUpperCase()}</Button>
        </div>
      </div>
    );
  }
}
export default SecondStage;
