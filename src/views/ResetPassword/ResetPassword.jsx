import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import { Container, Media } from 'reactstrap';
import styles from './ResetPassword.module.scss';

import PasswordPage from './PasswordPage/PasswordPage.jsx';
import Logo from 'assets/images/big-logo.png';

import { translate } from "common/methods/translations";
import MessageDiv from 'components/MessageDiv/MessageDiv';
import AuthService from "services/AuthService";

@observer
class ResetPassword extends Component {
  @observable currentStage = 0;
  @observable message = 'expiredLink';

  constructor() {
    super();
    this.resetPasswordHandleStage = this.resetPasswordHandleStage.bind(this);
    this.correctPasswordReceived = this.correctPasswordReceived.bind(this);
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    if (AuthService.isTokenExpired(token)) {
      this.currentStage = 1;
    }
  }

  correctPasswordReceived() { //TODO request to api with new password
    this.message = 'passwordSuccessfullyChanged';
    this.currentStage = 1;
  }

  resetPasswordHandleStage() {
    const { history } = this.props;
    switch (this.currentStage) {
      case 0:
        return (<PasswordPage history={history} onCorrectPass={this.correctPasswordReceived} email={this.email} redirect='/home' />);
      case 1:
        return (<MessageDiv showElement={true} styles={styles.ErrorMessage}>{translate(`resetPassword.${this.message}`)}</MessageDiv>);
      default:
        break;
    }
  }

  render() {

    return (
      <Container fluid className={styles.Background}>
        <div className={styles.LoginModal}>
          <div className={styles.LogoSection}>
            <Media src={Logo} />
            <span>Version 2.00.XXXX - © 2018 - Paprec Group</span>
          </div>
          <div className={`${styles.LoginForm} ${this.currentStage === 1 ? styles.Centered : null} `}>
            <h3>{translate('resetPassword.title')}</h3>
            {this.resetPasswordHandleStage()}
          </div>
        </div>
      </Container>
    );
  }
}
export default ResetPassword;
