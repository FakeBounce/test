import React, { Component } from "react";
import { Button } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { translate } from "common/methods/translations";

import UserModel from "models/UserModel";
import Modal from "elements/Modal/Modal";
import _ from "lodash";
import validateEmail from "common/methods/ValidateEmail";

@observer
class SelectModal extends Component {
  @observable firstName = "";
  @observable lastName = "";
  @observable email = "";
  @observable function_ = "";
  @observable phoneNumber = "";
  @observable profile = "";

  constructor() {
    super();
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFunction_Change = this.handleFunction_Change.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.selectedProfile = this.selectedProfile.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.debounceInput = _.debounce(this.debounceInput, 600);
  }

  resetFields() {
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.function_ = null;
    this.phoneNumber = null;
    this.profile = null;
  }

  saveButtonClick() {
    const { handleSaveButtonClick } = this.props;
    const newUser = new UserModel(
      null,
      this.firstName,
      this.lastName,
      this.email,
      this.function_,
      this.phoneNumber,
      this.profile
    );
    this.resetFields();
    handleSaveButtonClick(newUser);
  }

  saveButton() {
    return (
      <Button color="primary" onClick={this.saveButtonClick.bind(this)}>
        {translate("globals.save")}
      </Button>
    );
  }

  debounceInput(email) {
    if (validateEmail(email)) {
      if (email) {
        //TODO check if email exist if so throw appropriate message
        console.log("email can be used");
      } else {
        console.log("email already exist");
      }
    } else {
      //TODO throw wrong email format
      console.log("wrong email format");
    }
  }

  handleEmailChange(email) {
    this.email = email;
    this.debounceInput(email);
  }

  handleFunction_Change(function_) {
    this.function_ = function_;
  }

  handlePhoneNumberChange(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  selectedProfile(profile) {
    this.profile = profile;
  }

  handleFirstNameChange(firstName) {
    this.firstName = firstName;
  }

  handleLastNameChange(lastName) {
    this.lastName = lastName;
  }

  render() {
    return (
      <Modal
        ModalFooterContent={this.saveButton.bind(this)}
        {...this.props}
        className={"FormModal"}
      >
        <p>{translate("myProfile.alerts.contractSelection")}</p>
      </Modal>
    );
  }
}

export default SelectModal;
