import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import { translate } from "common/methods/translations";

import validator from "validator";
import UserModel from "models/UserModel";
import Select from 'elements/Select/Select';
import Input from 'elements/Input/Input';
import Modal from 'elements/Modal/Modal';
import styles from './FormModal.module.scss'
import fieldValidation from 'common/methods/FieldValidation';

@observer
class FormModal extends Component {
  @observable firstName = '';
  @observable lastName = '';
  @observable email = '';
  @observable function_ = '';
  @observable phoneNumber = '';
  @observable profile = '';
  @observable errors = observable({
    firstName: false,
    lastName: false,
    email: false,
    function_: false,
    phoneNumber: false,
    profile: false
  });
  @observable error = false;
  requiredFields = [
    'firstName',
    'lastName',
    'email',
    'function_',
    'phoneNumber',
    'profileId'
  ];

  constructor() {
    super();
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFunction_Change = this.handleFunction_Change.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.selectedProfile = this.selectedProfile.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  resetFields() {
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.function_ = null;
    this.phoneNumber = null;
    this.profileId = null;
    this.error = false;
    this.requiredFields.forEach((field) => {
      this.errors[field] = false;
    });
    this.errors.emailFormat = false;
    this.errors.phoneNumberFormat = false;
  }

  saveButtonClick() {
    this.error = false;
    const { handleSaveButtonClick } = this.props;

    this.requiredFields.forEach((field) => {
      if (!this[field]) {
        this.errors[field] = true;
        this.error = true;
      } else {

        switch (field) {
          case 'firstName' : 
            if(!fieldValidation('name', this[field])){
              console.log("FirstName contains bad carac...");
              this.errors[field] = true;
              this.error = true; 
            } else {
              this.errors[field] = false;
            }
            break; 
          case 'lastName' : 
            if(!validator.isAlpha(this[field])) {
              console.log('LastName not good');
              this.errors[field] = true;
              this.error = true; 
            } else {
              this.errors[field] = false;
            }
            break; 
          case 'email' :
              if(!validator.isEmail(this[field])) {
                console.log('Email not good'); 
                this.errors[field] = true;
                this.error = true;
              } else {
                this.errors[field] = false;
              }
              if(!fieldValidation('email', this[field])){
                console.log('Email format not good'); 
                this.errors[field] = true;
                this.errors.emailFormat = true;
                this.error = true;
              } else {
                this.errors[field] = false;
                this.errors.emailFormat = false;
              }
            break;  
          case 'function_' :
            break;  
          case 'phoneNumber' :
              if(!fieldValidation('phoneNumber', this[field])) {
                console.log('phone number with regex  not good'); 
                this.errors[field] = true;
                this.errors.phoneNumberFormat = true;
                this.error = true;
              } else {
                this.errors[field] = false;
                this.errors.phoneNumberFormat = false;
              }
            break;  
          case 'profileId' :
            break;  
          default : 
            break; 

        }
        
      }
    });
    console.log('MyField : ', this.errors);  
    if (!this.error) {
      const newUser = new UserModel(
        null,
        this.firstName,
        this.lastName,
        this.email,
        this.function_,
        this.phoneNumber,
        this.profileId
      );
      handleSaveButtonClick(newUser);
    }
  }

  componentDidMount() {
    this.props.setClick(this.resetFields);
  }

  componentWillUnmount() {

  }

  saveButton() {
    return (
      <Button color="primary" onClick={this.saveButtonClick.bind(this)}>{translate('globals.save')}</Button>
    );
  }

  handleEmailChange(email) {
    this.email = email;
  }

  handleFunction_Change(function_) {
    this.function_ = function_;
  }

  handlePhoneNumberChange(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  selectedProfile(profileId) {
    this.profileId = profileId;
  }

  handleFirstNameChange(firstName) {
    this.firstName = firstName;
  }

  handleLastNameChange(lastName) {
    this.lastName = lastName;
  }

  render() {
    const { availableProfiles } = this.props;
    return (
      <Modal
        ModalFooterContent={this.saveButton.bind(this)}
        {...this.props}
        className={`FormModal ${styles.FormModal}`}
      >
        <Input
          inputValue={this.handleFirstNameChange}
          placeholder={translate('myProfile.personalInformation.firstName')}
        />
        <p className={styles.ErrorBox} hidden={!this.errors.firstName}>{translate('globals.required')}</p>
        <Input
          inputValue={this.handleLastNameChange}
          placeholder={translate('myProfile.personalInformation.lastName')}
        />
        <p className={styles.ErrorBox} hidden={!this.errors.lastName}>{translate('globals.required')}</p>
        <Input
          inputValue={this.handleEmailChange}
          placeholder={translate('myProfile.personalInformation.email')}
        />
        <p className={styles.ErrorBox} hidden={!this.errors.email}>{translate('globals.required')}</p>
        <p className={styles.ErrorBox + ' ' + styles.FormatError} hidden={!this.errors.emailFormat}>{translate('myContracts.users.mailError')}</p>
        <Input
          inputValue={this.handleFunction_Change}
          placeholder={translate('myProfile.personalInformation.function')}
        />
        <p className={styles.ErrorBox} hidden={!this.errors.function_}>{translate('globals.required')}</p>
        <Input
          inputValue={this.handlePhoneNumberChange}
          placeholder={translate('myProfile.personalInformation.phoneNumber')}
        />
        <p className={styles.ErrorBox} hidden={!this.errors.phoneNumber}>{translate('globals.required')}</p>
        <p className={styles.ErrorBox + ' ' + styles.FormatError} hidden={!this.errors.phoneNumberFormat}>{translate('myContracts.users.phoneNumberError')}</p>
        <Select
          selectedOption={this.selectedProfile}
          setOptions={availableProfiles}
        />
        <p className={styles.ErrorBox + ' ' + styles.SelectFix} hidden={!this.errors.profileId}>{translate('globals.required')}</p>
      </Modal>
    );
  }
}

export default FormModal;
