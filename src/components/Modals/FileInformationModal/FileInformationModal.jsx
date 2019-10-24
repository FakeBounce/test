import React, { Component } from "react";
import { translate } from "common/methods/translations";

import Modal from "elements/Modal/Modal";
import styles from "./FileInformationModal.scss";

class FileInformationModal extends Component {
  buttons = () => {
    return null;
  };

  render() {
    return (
      <Modal
        {...this.props}
        className={"NewFileModal"}
        ModalFooterContent={this.buttons}
      >
        {this.props.username !== "" && (
          <p className={styles.Paragraph}>
            {translate("myCollaborativeSpace.modals.createdBy")}
            <span>{this.props.username}</span>
          </p>
        )}
        {this.props.creationDate !== "" && (
          <p className={styles.Paragraph}>
            {translate("myCollaborativeSpace.modals.creationDate")}
            <span>{this.props.creationDate}</span>
          </p>
        )}
        {this.props.lastUpdateDate !== "" && (
          <p className={styles.Paragraph}>
            {translate("myCollaborativeSpace.modals.lastUpdateDate")}
            <span>{this.props.lastUpdateDate}</span>
          </p>
        )}
      </Modal>
    );
  }
}

export default FileInformationModal;
