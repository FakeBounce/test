import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Container, Media } from "reactstrap";
import styles from "./LoginPage.module.scss";
//import EmailPage from './EmailPage/EmailPage.jsx'
import PasswordPage from "./PasswordPage/PasswordPage.jsx";
//import Logo from 'assets/images/recyclageByNodus.svg';
import Logo from "assets/images/nodusRecyclageLogo.svg";

import RetrieveAccount from "./RetrieveAccount/RetrieveAccount";
import CheckEmailPage from "./CheckEmailPage/CheckEmailPage";
import AuthService from "services/AuthService";
import CollectiviteService from "services/CollectiviteService";
import { Redirect } from "react-router-dom";

import ReactGA from "react-ga";

@observer
class LoginPage extends Component {
  @observable email = "";
  @observable password = "";
  @observable loginStage = 1;
  @observable firstLoginPageValidate = false;
  @observable collectiviteInfo = {};

  constructor() {
    super();
    this.correctLoginReceived = this.correctLoginReceived.bind(this);
    this.correctPasswordReceived = this.correctPasswordReceived.bind(this);
    this.switchLoginProcess = this.switchLoginProcess.bind(this);
    this.setStage = this.setStage.bind(this);
  }

  async componentDidMount() {
    const { history } = this.props;

    if (AuthService.loggedIn()) {
      history.push("/home");
    }
  }

  async getCollectiviteInfo() {
    this.collectiviteInfo = await CollectiviteService.getCurrentCollectivite();
    if (
      this.collectiviteInfo &&
      this.collectiviteInfo.dateModification !== null
    ) {
      this.firstLoginPageValidate = true;
    }
  }

  correctLoginReceived(email) {
    this.email = email;
  }

  async correctPasswordReceived(siren) {
    const { setCurrentCollectiviteInfo } = this.props;
    await this.getCollectiviteInfo();
    if (this.collectiviteInfo) {
      setCurrentCollectiviteInfo(siren);
      localStorage.setItem(
        "collectiviteInfo",
        `${this.collectiviteInfo.name &&
          this.collectiviteInfo.name.trim()} (${siren})`
      );
      localStorage.setItem("siren", siren);

      ReactGA.event({
        category: `${this.collectiviteInfo.name &&
          this.collectiviteInfo.name.trim()} (${siren})`,
        action: "Authentication"
      });

      ReactGA.event({
        category: `Global`,
        action: "Authentication"
      });
      this.loginStage = 3;
    }
  }

  switchLoginProcess() {
    const { history } = this.props;
    const { portalSiren } = this.props.match.params;
    switch (this.loginStage) {
      case 1:
        return (
          <PasswordPage
            history={history}
            setStage={this.setStage}
            onCorrectPass={this.correctPasswordReceived}
            onCorrectLogin={this.correctLoginReceived}
            email={this.email}
            siren={portalSiren}
            redirect={"/home"}
          />
        );
      case 2:
        return (
          <RetrieveAccount
            history={history}
            setStage={this.setStage}
            setEmail={this.setEmail}
            email={this.email}
            redirect={"/home"}
          />
        );
      case 3:
        if (!this.firstLoginPageValidate) {
          return <Redirect to={"/firstLogin"} />;
        } else {
          return <Redirect to={"/home"} />;
        }
      case 4:
        return <CheckEmailPage setStage={this.setStage} email={this.email} />;
      default:
        break;
    }
  }

  setStage(stage) {
    this.loginStage = stage;
  }

  setEmail = email => {
    if (email) {
      this.email = email;
    }
  };

  render() {
    return (
      <Container fluid className={styles.Background}>
        <div className={styles.LoginModal}>
          <div className={styles.LogoSection}>
            <Media src={Logo} />
            <span>Version 1.00.1 - © 2018 - Paprec Group</span>
          </div>
          <div className={styles.LoginForm}>{this.switchLoginProcess()}</div>
        </div>
      </Container>
    );
  }
}

export default LoginPage;
