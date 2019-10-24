import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import styles from "./PasswordPage.module.scss";
import { Input, Button, InputGroup, Label, Media } from "reactstrap";
import ShowPass from "assets/images/showpass_icon.png";
import { translate } from "common/methods/translations";

import MessageDiv from "components/MessageDiv/MessageDiv";
import AuthService from "services/AuthService";
import validateEmail from "common/methods/ValidateEmail";

@observer
class PasswordPage extends Component {
  @observable password = "";
  @observable login = "";
  @observable portalSiren = "";
  @observable passwordInputType = "password";
  @observable showError = false;
  @observable errorMessage = "";
  @observable showWrongEmailFormatMessage = false;

  constructor() {
    super();
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.managePasswordVisibility = this.managePasswordVisibility.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyPressEvent = this.onKeyPressEvent.bind(this);
    this.resetPasswordPageRedirect = this.resetPasswordPageRedirect.bind(this);
    this.returnToLoginStage = this.returnToLoginStage.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mouseup", this.hidePassword, false);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.hidePassword, false);
  }

  handleChangePassword(event) {
    this.password = event.target.value;
  }

  handleChangeLogin(event) {
    const { onCorrectLogin } = this.props;
    this.login = event.target.value;
    if (validateEmail(this.login)) {
      if (this.login) {
        this.showWrongEmailFormatMessage = false;
        onCorrectLogin(this.login);
      } else {
      }
    } else {
      this.showWrongEmailFormatMessage = true;
    }
  }

  managePasswordVisibility() {
    this.passwordInputType =
      this.passwordInputType === "text" ? "password" : "text";
  }

  handleSubmit() {
    const { onCorrectPass, email, siren } = this.props;
    const body = {
      userName: email,
      password: this.password
    };
    if (siren !== undefined) {
      body.siren = siren;
    }


    AuthService.login(body).then(response => {
      if (response.state && !response.body.StatusCode) {
        onCorrectPass(siren);
      } else {
        this.errorMessage = response.message;
        if (response.status === 401) {
          this.errorMessage = translate("login.incorrectPassword");
        }
        this.showError = true;
      }
    });
  }

  onKeyPressEvent(e) {
    const key = e.which || e.keyCode;
    if (
      key === 13 &&
      this.login &&
      this.password &&
      !this.showWrongEmailFormatMessage
    ) {
      this.handleSubmit();
    }
  }

  resetPasswordPageRedirect() {
    const { setStage } = this.props;
    setStage(2);
  }
  returnToLoginStage() {
    const { setStage } = this.props;
    setStage(1);
  }

  render() {
    const passwordPlaceholder = translate("login.password");
    return (
      <div className={styles.PasswordPage}>
        <h3>{translate("login.login")}</h3>
        <InputGroup className={styles.ActiveGroup}>
          <Input
            className={`${styles.EmailInput} ${
              this.showWrongEmailFormatMessage ? styles.error : null
            }`}
            required
            placeholder="E-mail"
            type="text"
            value={this.login}
            onChange={this.handleChangeLogin}
            onKeyPress={this.onKeyPressEvent}
            autoFocus
          />
          <Label>E-mail</Label>
        </InputGroup>
        <MessageDiv
          showElement={this.showWrongEmailFormatMessage}
          styles={styles.ErrorMessage}
        >
          Mauvais format d'E-mail
        </MessageDiv>
        <br />
        <InputGroup className={styles.ActiveGroup}>
          <Input
            placeholder={passwordPlaceholder}
            className={`${styles.PasswordInput} ${
              this.showError ? styles.error : null
            }`}
            required
            type={this.passwordInputType}
            value={this.password}
            onChange={this.handleChangePassword}
            onKeyPress={this.onKeyPressEvent}
          />
          <Label>{passwordPlaceholder}</Label>
          <Media
            className={styles.ShowPass}
            src={ShowPass}
            onClick={this.managePasswordVisibility}
          />
        </InputGroup>
        <MessageDiv showElement={this.showError} styles={styles.ErrorMessage}>
          {this.errorMessage}
        </MessageDiv>
        <Button
          disabled={
            !this.password || this.showWrongEmailFormatMessage || !this.login
          }
          onClick={this.handleSubmit}
        >
          {translate("login.connection").toUpperCase()}
        </Button>
        <span onClick={this.resetPasswordPageRedirect}>
          {translate("login.passwordForgetQuestion")}
        </span>
      </div>
    );
  }
}

export default PasswordPage;
