import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Input, Button, InputGroup, Label } from "reactstrap";
import validateEmail from "common/methods/ValidateEmail";
import styles from "./RetrieveAccount.module.scss";

import { translate } from "common/methods/translations";
import MessageDiv from "components/MessageDiv/MessageDiv";

@observer
class RetrieveAccount extends Component {
  @observable login = "";
  @observable showWrongEmailFormatMessage = false;

  constructor() {
    super();
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyPressEvent = this.onKeyPressEvent.bind(this);
    this.loginPageRedirect = this.loginPageRedirect.bind(this);
  }

  handleSubmit() {
    const { setStage, setEmail } = this.props;
    if (validateEmail(this.login)) {
      if (this.login) {
        setStage(4);
        setEmail(this.login);
      }
    } else {
      this.showWrongEmailFormatMessage = true;
    }
  }

  handleChangeLogin(event) {
    this.login = event.target.value;
  }

  onKeyPressEvent(e) {
    const key = e.which || e.keyCode;
    if (key === 13) {
      this.handleSubmit();
    }
  }

  loginPageRedirect() {
    const { setStage } = this.props;
    //setStage(0);
    setStage(1);
  }

  render() {
    return (
      <div className={styles.EmailPage}>
        <h3>{translate("resetPassword.title")}</h3>
        <p>{translate("resetPassword.subtitle")}</p>
        <InputGroup className={styles.EmailGroup}>
          <Input
            className={`${styles.EmailInput} ${
              this.showWrongEmailFormatMessage ? styles.Red : null
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
          <MessageDiv
            showElement={this.showWrongEmailFormatMessage}
            styles={styles.ErrorMessage}
          >
            Wrong email format
          </MessageDiv>
        </InputGroup>
        <Button disabled={!this.login} onClick={this.handleSubmit}>
          {translate("resetPassword.sendRequest").toUpperCase()}
        </Button>
        <span onClick={this.loginPageRedirect}>{translate("login.login")}</span>
      </div>
    );
  }
}

export default RetrieveAccount;
