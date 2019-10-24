import React, { Component } from "react";
import { Button } from "reactstrap";

import { translate } from "common/methods/translations";
import Modal from "elements/Modal/Modal";
import classNames from "classnames";

class ConfirmModal extends Component {
  yesButtonClick() {
    const { handleYesButtonClick } = this.props;
    handleYesButtonClick();
  }

  noButtonClick() {
    const { handleNoButtonClick } = this.props;
    handleNoButtonClick();
  }

  redButtons() {
    return (
      <div>
        <Button color="danger" onClick={this.yesButtonClick.bind(this)}>
          {translate("globals.yes")}
        </Button>{" "}
        <Button color="secondary" onClick={this.noButtonClick.bind(this)}>
          {translate("globals.no")}
        </Button>
      </div>
    );
  }

  blueButtons() {
    return (
      <div>
        <Button color="primary" onClick={this.yesButtonClick.bind(this)}>
          {translate("globals.yes")}
        </Button>{" "}
        <Button color="secondary" onClick={this.noButtonClick.bind(this)}>
          {translate("globals.no")}
        </Button>
      </div>
    );
  }

  render() {
    const { theme } = this.props;
    const redConfirmClass = classNames("ConfirmModal", "Red");
    const blueConfirmClass = classNames("ConfirmModal", "Blue");
    if (theme === "red") {
      return (
        <Modal
          ModalFooterContent={this.redButtons.bind(this)}
          {...this.props}
          className={redConfirmClass}
        />
      );
    } else {
      return (
        <Modal
          ModalFooterContent={this.blueButtons.bind(this)}
          {...this.props}
          className={blueConfirmClass}
        />
      );
    }
  }
}

export default ConfirmModal;
