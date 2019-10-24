import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./Modal.module.scss";

class ModalElement extends Component {
  render() {
    const {
      isOpen,
      toggle,
      className,
      children,
      title,
      ModalFooterContent = null
    } = this.props;
    return (
      <div>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          className={`${styles.ModalContent} ${className}`}
        >
          <ModalHeader className={styles.ModalHeader} toggle={toggle}>
            {title}
          </ModalHeader>
          <ModalBody className={styles.ModalBody}>{children}</ModalBody>
          <ModalFooter>
            {ModalFooterContent && <ModalFooterContent />}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalElement;
