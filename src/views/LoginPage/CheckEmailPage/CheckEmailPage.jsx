import React, { Component } from "react";
import styles from "./CheckEmailPage.module.scss";
import { Button } from "reactstrap";
import { translate } from "common/methods/translations";

class CheckEmailPage extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { setStage } = this.props;
    //setStage(0);
    setStage(1);
  }

  render() {
    const { email } = this.props;
    return (
      <div className={styles.Container}>
        <div>
          {email.toLowerCase().includes("paprec.")
            ? "En tant qu'utilisateur Paprec, votre mot de passe est celui de votre session. Si vous ne vous souvenez plus de celui-ci, merci de contacter la Hotline Paprec."
            : "Un mail vient d'être envoyé sur l'adresse mail indiquée"}
        </div>
        <Button onClick={this.handleClick}>
          {translate("resetPassword.backLoginPage")}
        </Button>
      </div>
    );
  }
}
export default CheckEmailPage;
