import React, { Component } from "react";
import styles from "./PersonalInformations.module.scss";
import { Media, Row, Col } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";

import Input from "elements/Input/Input";
import Select from "elements/Select/Select";
import MessageDiv from "components/MessageDiv/MessageDiv";
import InformationModal from "components/Modals/InformationModal/InformationModal";
import UserModel from "models/UserModel";

import CurrentUserService from "services/CurrentUserService";
import CurrentUserStore from "stores/CurrentUserStore";
import Tick from "assets/images/green_tick.png";
import ReactGA from "react-ga";
import { translate } from "common/methods/translations";

@observer
class PersonalInformations extends Component {
  static tabName = "personalInformation";
  @observable user = {};
  @observable edit_mode_1 = false;
  @observable edit_mode_2 = false;
  @observable oldPassword = "";
  @observable newPassword = "";
  @observable confirmPassword = "";
  @observable showError = false;
  @observable errorMessage = "";
  @observable infoModalContent = "";
  @observable informationModalOpen = false;

  //TODO get data from db
  fakeTemplate = [
    { name: translate("myProfile.personalInformation.profileType"), value: "" },
    { name: "Exploitation", value: "Exploitation" },
    { name: "Gestion", value: "Gestion" },
    { name: "Environment", value: "Environment" }
  ];

  constructor() {
    super();
    this.changeMode1 = this.changeMode1.bind(this);
    this.changeMode2 = this.changeMode2.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.handleChangePersonalInformationProfile = this.handleChangePersonalInformationProfile.bind(
      this
    );
    this.handleSaveContactInformation = this.handleSaveContactInformation.bind(
      this
    );
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setFunction = this.setFunction.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPhoneNumber = this.setPhoneNumber.bind(this);
  }

  componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "MyProfile/PersonalInformations"
    });

    ReactGA.event({
      category: `Global`,
      action: "MyProfile/PersonalInformations"
    });

    this.user = Object.assign(new UserModel(), CurrentUserStore.currentUser);
  }

  changeMode1() {
    if (this.edit_mode_1) {
      this.user = Object.assign(new UserModel(), CurrentUserStore.currentUser);
    }
    this.edit_mode_1 = !this.edit_mode_1;
  }

  changeMode2() {
    this.edit_mode_2 = !this.edit_mode_2;
  }

  async changePassword() {
    if (!this.confirmPassword || !this.newPassword || !this.oldPassword) {
      this.showErrorMessage("allFieldsRequired");
    } else if (this.confirmPassword !== this.newPassword) {
      this.showErrorMessage("differentPasswords");
    } else {
      const data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      const response = await CurrentUserService.changePassword(
        this.user.id,
        data
      );
      if (response.status) {
        this.infoModalContent = (
          <div>
            <Media src={Tick} />
            <p>{translate("globals.updateSuccessful")}</p>
          </div>
        );

        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      } else {
        if (response.message === "Forbidden") {
          this.infoModalContent = translate(
            "myProfile.personalInformation.wrongOldPassword"
          );
        } else {
          this.infoModalContent = translate("globals.generalError");
        }
      }
      this.informationModalOpen = true;
    }
  }

  informationOkButtonClick() {
    this.informationModalOpen = false;
  }

  handleOldPasswordChange(password) {
    this.oldPassword = password;
  }

  handleNewPasswordChange(password) {
    this.newPassword = password;
  }

  handleConfirmPasswordChange(password) {
    this.confirmPassword = password;
  }

  showErrorMessage(messageType) {
    this.errorMessage = translate(
      `myProfile.personalInformation.${messageType}`
    );
    this.showError = true;
  }

  handleChangePersonalInformationProfile(newProfile) {
    this.profile = newProfile;
  }

  handleSaveContactInformation() {
    //TODO button SAVE in Contact information was clicked, do the things with api to change that infos
    const newUser = new UserModel(
      null,
      this.firstName,
      this.lastName,
      this.email,
      this.function_,
      this.phoneNumber,
      this.profile
    );
    console.log("SAVE clicked", newUser);
  }

  setFirstName(firstName) {
    this.user.firstName = firstName;
  }

  setLastName(lastName) {
    this.user.lastName = lastName;
  }

  setFunction(function_) {
    this.user.function_ = function_;
  }

  setEmail(email) {
    this.user.email = email;
  }

  setPhoneNumber(phoneNumber) {
    this.user.phoneNumber = phoneNumber;
  }

  render() {
    return (
      <div className={styles.PersonalInformations}>
        <Row>
          <Col sm="12">
            <div className={styles.TabBox}>
              <div className={styles.TopBar}>
                <h4>
                  {translate(
                    "myProfile.personalInformation.contactInformation"
                  )}
                </h4>
                {this.edit_mode_1 ? (
                  <div>
                    <button
                      onClick={this.handleSaveContactInformation}
                      className={styles.TextButton}
                    >
                      {translate("globals.save")}
                    </button>
                    <button
                      onClick={this.changeMode1}
                      className={styles.TextButton}
                    >
                      {translate("globals.cancel")}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={this.changeMode1}
                    className={styles.EditButton}
                  />
                )}
              </div>

              <Row>
                <Col sm="4">
                  <div className={styles.DataColumn}>
                    <h4>
                      {translate("myProfile.personalInformation.firstName")}
                    </h4>
                    <p>{this.user.firstName}</p>
                    <h4>{translate("myProfile.personalInformation.email")}</h4>
                    <p>{this.user.email}</p>
                  </div>
                </Col>
                <Col sm="4">
                  <div className={styles.DataColumn}>
                    <h4>
                      {translate("myProfile.personalInformation.lastName")}
                    </h4>
                    <p>{this.user.lastName}</p>
                    <h4>
                      {translate("myProfile.personalInformation.phoneNumber")}
                    </h4>
                    {this.edit_mode_1 ? (
                      <Input
                        inputValue={this.setPhoneNumber}
                        initialValue={this.user.phoneNumber}
                      />
                    ) : (
                      <p>{this.user.phoneNumber}</p>
                    )}
                  </div>
                </Col>
                <Col sm="4">
                  <div className={styles.DataColumn}>
                    <h4>
                      {translate("myProfile.personalInformation.function")}
                    </h4>
                    {this.edit_mode_1 ? (
                      <Input
                        inputValue={this.setFunction}
                        initialValue={this.user.function_}
                      />
                    ) : (
                      <p>{this.user.function_}</p>
                    )}
                    <h4>
                      {translate("myProfile.personalInformation.profile")}
                    </h4>
                    {this.edit_mode_1 ? (
                      <Select
                      // initialOption={this.selectedTemplate}
                      // selectedOption={this.handleChangePersonalInformationProfile}
                      // setOptions={this.user.profile}
                      />
                    ) : (
                      <p>{this.user.profile}</p>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <div className={styles.TabBox}>
              <div className={styles.TopBar}>
                <h4>
                  {translate("myProfile.personalInformation.changePassword")}
                </h4>
                {this.edit_mode_2 ? (
                  <div>
                    <button
                      className={styles.TextButton}
                      onClick={this.changePassword}
                    >
                      {translate("globals.save")}
                    </button>
                    <button
                      onClick={this.changeMode2}
                      className={styles.TextButton}
                    >
                      {translate("globals.cancel")}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={this.changeMode2}
                    className={styles.EditButton}
                  />
                )}
              </div>

              <Row>
                <Col sm="12">
                  {this.edit_mode_2 ? (
                    <div className={styles.DataColumn}>
                      <Row className={styles.ChangePassword}>
                        <Col sm="4">
                          <h4>
                            {translate(
                              "myProfile.personalInformation.oldPassword"
                            )}
                          </h4>
                          <Input inputValue={this.handleOldPasswordChange} />
                        </Col>
                        <Col sm="4">
                          <h4>{translate("globals.newPassword")}</h4>
                          <Input inputValue={this.handleNewPasswordChange} />
                        </Col>
                        <Col sm="4">
                          <h4>{translate("globals.confirmPassword")}</h4>
                          <Input
                            inputValue={this.handleConfirmPasswordChange}
                          />
                        </Col>
                        <MessageDiv
                          showElement={this.showError}
                          styles={styles.ErrorMessage}
                        >
                          {this.errorMessage}
                        </MessageDiv>
                      </Row>
                    </div>
                  ) : (
                    <div className={styles.DataColumn}>
                      <p>•••••••••••••</p>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <InformationModal
          isOpen={this.informationModalOpen}
          title=""
          handleOkButtonClick={this.informationOkButtonClick.bind(this)}
          toggle={() => (this.informationModalOpen = false)}
        >
          <div>{this.infoModalContent}</div>
        </InformationModal>
      </div>
    );
  }
}

export default PersonalInformations;
