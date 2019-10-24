import React, {Component} from 'react';
import styles from './ThirdStage.module.scss';
import {Input, Button, InputGroup, Label} from 'reactstrap';

import { translate } from "common/methods/translations";
import {observer} from "mobx-react";
import {observable} from "mobx";
import MessageDiv from 'components/MessageDiv/MessageDiv';
import fieldValidation from 'common/methods/FieldValidation';

@observer
class ThirdStage extends Component {
  @observable streetNameAndNumberValue = '';
  @observable postalBoxValue = '';
  @observable postalCodeValue = '';
  @observable cityValue = '';
  @observable etablissementAddress = {};

  constructor(props) {
    super(props);
    this.etablissementAddress = this.props.etablissementAddress;

    this.streetNameAndNumberValue = this.etablissementAddress.address_1 !== undefined ? this.etablissementAddress.address_1 : '';
    this.postalCodeValue = this.etablissementAddress.postalCode !== undefined ? this.etablissementAddress.postalCode : '';
    this.cityValue = this.etablissementAddress.city !== undefined ? this.etablissementAddress.city : '';

    this.nextPageHandler = this.nextPageHandler.bind(this);
    this.previousPageHandler = this.previousPageHandler.bind(this);
    this.handleStreetNameAndNumberChange = this.handleStreetNameAndNumberChange.bind(this);
    this.handlePostalBoxChange = this.handlePostalBoxChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleCityValueChange = this.handleCityValueChange.bind(this);
  }

  nextPageHandler() {
    const {changeStage, thirdStageData} = this.props;
    thirdStageData({
      streetNameAndNumber: this.streetNameAndNumberValue,
      postalBox: this.postalBoxValue,
      postalCode: this.postalCodeValue,
      city: this.cityValue,
    });
    changeStage(+1);
  }

  previousPageHandler() {
    const {changeStage} = this.props;
    changeStage(-1);
  }

  handleStreetNameAndNumberChange(event) {
    this.streetNameAndNumberValue = event.target.value;
  }

  handlePostalBoxChange(event) {
    this.postalBoxValue = event.target.value;
  }

  handlePostalCodeChange(event) {
    this.postalCodeValue = event.target.value;
    if (fieldValidation('zipCode',this.postalCodeValue)) {
      if (this.postalCodeValue) { 
        this.showWrongPostalCodeFormatMessage = false;
      } else {
        
      }
    } else {
      this.showWrongPostalCodeFormatMessage = true;
    }
  }

  handleCityValueChange(event) {
    this.cityValue = event.target.value;
  }


  render() {
    const street = translate('firstLoginPage.street');
    const postalCode = translate('firstLoginPage.postalCode');
    const city = translate('firstLoginPage.city');
    return (
      <div className={styles.Container}>
        <span>{translate('firstLoginPage.headquarters')}</span>
        <InputGroup className={styles.ActiveGroup}>
          <Input
            required
            type="text"
            placeholder={street}
            value={this.streetNameAndNumberValue}
            onChange={this.handleStreetNameAndNumberChange}
          />
          <Label>{street}</Label>
        </InputGroup>
        {/* <InputGroup className={styles.ActiveGroup}>
          <Input
            required
            type="text"
            placeholder={postalBox}
            value={this.postalBoxValue}
            onChange={this.handlePostalBoxChange}
          />
          <Label>{postalBox}</Label>
        </InputGroup> */}
        <InputGroup className={styles.ActiveGroup}>
          <Input
            className={`${this.showWrongPostalCodeFormatMessage ? styles.error : null}`}
            required
            type="text"
            placeholder={postalCode}
            value={this.postalCodeValue}
            onChange={this.handlePostalCodeChange}
          />
          <Label>{postalCode}</Label>
        </InputGroup>
        <MessageDiv showElement={this.showWrongPostalCodeFormatMessage} styles={styles.ErrorMessage}>Mauvais format de code Postal</MessageDiv> 
        <InputGroup className={styles.ActiveGroup}>
          <Input
            required
            type="text"
            placeholder={city}
            value={this.cityValue}
            onChange={this.handleCityValueChange}
          />
          <Label>{city}</Label>
        </InputGroup>
        <div className={styles.ButtonsContainer}>
          <Button className={styles.BackButton}
                  onClick={this.previousPageHandler}>{translate('globals.return').toUpperCase()}</Button>
          <Button onClick={this.nextPageHandler} 
            disabled={this.cityValue === '' || this.postalCodeValue === '' || this.streetNameAndNumberValue === ''}>
            {translate('globals.next').toUpperCase()}
          </Button>
        </div>
      </div>
    );
  }
}

export default ThirdStage;
