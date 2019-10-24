import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import { Input, Button, InputGroup, Label, Media } from 'reactstrap';
import validateEmail from 'common/methods/ValidateEmail';
import styles from './EmailPage.module.scss';

import { translate } from "common/methods/translations";
import MessageDiv from 'components/MessageDiv/MessageDiv';

//Import from PasswordPage
// import AuthService from "services/AuthService";
// import ShowPass from 'assets/images/showpass_icon.png';

@observer
class EmailPage extends Component {
  @observable login = '';
  @observable showWrongEmailFormatMessage = false;
  
  //Import from PasswordPage
  // @observable password = '';
  // @observable passwordInputType = 'password';
  // @observable showError = false;
  // @observable errorMessage = '';

  constructor() {
    super();
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyPressEvent = this.onKeyPressEvent.bind(this);
    this.resetPasswordPageRedirect = this.resetPasswordPageRedirect.bind(this);
    // this.showWrongEmailFormatDiv = this.showWrongEmailFormatDiv.bind(this);

    //Import from PasswordPage
    // this.handleChangePassword = this.handleChangePassword.bind(this);
    // this.onKeyPressEvent = this.onKeyPressEvent.bind(this);
    // this.managePasswordVisibility = this.managePasswordVisibility.bind(this);

    //End Import from PasswordPage
  }

  handleSubmit() {
    const { onCorrectLogin } = this.props;
    if (validateEmail(this.login)) {
      if (this.login) { //TODO handle login auth
        onCorrectLogin(this.login);
      } else {
        //TODO email not found, show error
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

  resetPasswordPageRedirect() {
    const { setStage } = this.props;
    setStage(2);
  }

  //Import from PasswordPage
  // handleChangePassword(event) {
  //   this.password = event.target.value;
  // }

  // managePasswordVisibility() {
  //   this.passwordInputType = this.passwordInputType === 'text' ? 'password' : 'text';
  // }

  // handleSubmit() {
  //   const { onCorrectPass, email } = this.props;
  //   AuthService.login({userName: email, password: this.password}).then(response => {
  //     if (response.state) {
  //       onCorrectPass();
  //     } else {
  //       this.errorMessage = response.message;
  //       if (response.status === 401) {
  //         this.errorMessage = translate('login.incorrectPassword');
  //       }
  //       this.showError = true;
  //     }
  //   });
  // }

  // onKeyPressEvent(e) {
  //   const key = e.which || e.keyCode;
  //   if (key === 13) {
  //     this.handleSubmit();
  //   }
  // }

  //End Import from PasswordPage

  render() {
    const passwordPlaceholder = translate('login.password');
    return (
      <div>
        <h3>{translate('login.login')}</h3>
        <InputGroup className={styles.EmailGroup}>
          <Input
            className={`${styles.EmailInput} ${this.showWrongEmailFormatMessage ? styles.Red : null}`}
            required
            placeholder="E-mail"
            type="text"
            value={this.login}
            onChange={this.handleChangeLogin}
            onKeyPress={this.onKeyPressEvent}
            autoFocus
          />
          <Label>E-mail</Label>
          <MessageDiv showElement={this.showWrongEmailFormatMessage} styles={styles.ErrorMessage}>Wrong email format</MessageDiv>
        </InputGroup>
        {/* <div className={styles.PasswordPage}>
        <InputGroup className={styles.ActiveGroup}>
          <Input
            placeholder={passwordPlaceholder}
            className={`${styles.PasswordInput} ${this.showError ? styles.Red : null}`}
            required
            type={this.passwordInputType}
            value={this.password}
            onChange={this.handleChangePassword}
            onKeyPress={this.onKeyPressEvent}
            autoFocus
          />
          <Label>{passwordPlaceholder}</Label>
          <MessageDiv showElement={this.showError} styles={styles.ErrorMessage}>{this.errorMessage}</MessageDiv>
          <Media className={styles.ShowPass} src={ShowPass} onClick={this.managePasswordVisibility} />
        </InputGroup></div> */}
        <Button disabled={!this.login} onClick={this.handleSubmit}>{translate('globals.next').toUpperCase()}</Button>
        {/* <Button disabled={!this.password} onClick={this.handleSubmit}>{translate('login.connection').toUpperCase()}</Button> */}
        <span onClick={this.resetPasswordPageRedirect}>{translate('login.passwordForgetQuestion')}</span>
      </div>
    );
  }
}

export default EmailPage;
