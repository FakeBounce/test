import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import styles from "./PasswordPage.module.scss";
import { Input, Button, InputGroup, Label, Media } from "reactstrap";
import ShowPass from "assets/images/showpass_icon.png";

import { translate } from "common/methods/translations";
import MessageDiv from "components/MessageDiv/MessageDiv";

@observer
class PasswordPage extends Component {
  @observable password = "";
  @observable passwordConfirm = "";
  @observable passwordInputType = "password";
  @observable passwordConfirmInputType = "password";
  @observable showWrongPassMessage = false;

  constructor() {
    super();
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(
      this
    );
    this.managePasswordVisibility = this.managePasswordVisibility.bind(this);
    this.managePasswordConfirmVisibility = this.managePasswordConfirmVisibility.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyPressEvent = this.onKeyPressEvent.bind(this);
    this.loginPageRedirect = this.loginPageRedirect.bind(this);
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

  handleChangePasswordConfirm(event) {
    this.passwordConfirm = event.target.value;
  }

  managePasswordVisibility() {
    this.passwordInputType =
      this.passwordInputType === "text" ? "password" : "text";
  }

  managePasswordConfirmVisibility() {
    this.passwordConfirmInputType =
      this.passwordConfirmInputType === "text" ? "password" : "text";
  }

  handleSubmit() {
    const { onCorrectPass } = this.props;
    if (this.password === this.passwordConfirm) {
      onCorrectPass(this.password);
    } else {
      this.showWrongPassMessage = true;
    }
  }

  onKeyPressEvent(e) {
    const key = e.which || e.keyCode;
    if (key === 13) {
      this.handleSubmit();
    }
  }

  loginPageRedirect() {
    const { history } = this.props;
    history.push("/");
  }

  render() {
    const { email } = this.props;
    const newPassword = translate("globals.newPassword");
    const confirmPassword = translate("globals.confirmPassword");
    return (
      <div className={styles.PasswordPage}>
        <p>{email}</p>
        <InputGroup className={styles.ActiveGroup}>
          <Input
            placeholder={newPassword}
            className={`${styles.PasswordInput} ${
              this.showWrongPassMessage ? styles.Red : null
            }`}
            required
            type={this.passwordInputType}
            value={this.password}
            onChange={this.handleChangePassword}
            onKeyPress={this.onKeyPressEvent}
            autoFocus
          />
          <Label>{newPassword}</Label>
          <Media
            className={styles.ShowPass}
            src={ShowPass}
            onClick={this.managePasswordVisibility}
          />
        </InputGroup>
        <InputGroup className={styles.ActiveGroup}>
          <Input
            placeholder={confirmPassword}
            className={`${styles.PasswordInput} ${
              this.showWrongPassMessage ? styles.Red : null
            }`}
            required
            type={this.passwordConfirmInputType}
            value={this.passwordConfirm}
            onChange={this.handleChangePasswordConfirm}
            onKeyPress={this.onKeyPressEvent}
          />
          <Label>{confirmPassword}</Label>
          <MessageDiv
            showElement={this.showWrongPassMessage}
            styles={styles.ErrorMessage}
          >
            {translate("resetPassword.passwordsDoNotMatch")}
          </MessageDiv>
          <Media
            className={styles.ShowPass}
            src={ShowPass}
            onClick={this.managePasswordConfirmVisibility}
          />
        </InputGroup>
        <Button disabled={!this.password} onClick={this.handleSubmit}>
          {translate("resetPassword.resetButton").toUpperCase()}
        </Button>
      </div>
    );
  }
}

export default PasswordPage;
