import React, { Component } from "react";
import { Button } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { translate } from "common/methods/translations";

import Input from "elements/Input/Input";
import Modal from "elements/Modal/Modal";
import styles from "../FormModal/FormModal.module.scss";

@observer
class NewFolderModal extends Component {
  @observable error = false;

  constructor(props) {
    super(props);
    this.state = {
      fileName: props.currentName || ""
    };
    this.handleFileNameChange = this.handleFileNameChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentName) {
      this.setState(state => ({
        ...state,
        fileName: nextProps.currentName
      }));
    }
  }

  saveButtonClick() {
    const { fileName } = this.state;
    if (fileName !== "") {
      this.error = false;
      const { handleYesButtonClick } = this.props;
      handleYesButtonClick(fileName);
      this.setState(state => ({
        ...state,
        fileName: ""
      }));
    } else {
      this.error = true;
    }
  }

  cancelButtonClick() {
    const { handleNoButtonClick } = this.props;
    handleNoButtonClick();
    this.setState(state => ({
      ...state,
      fileName: ""
    }));
  }

  saveCancelButtons() {
    const { isRenaming } = this.props;
    return (
      <div>
        <Button color="primary" onClick={this.saveButtonClick.bind(this)}>
          {isRenaming ? translate("globals.save") : translate("globals.create")}
        </Button>
        <Button color="secondary" onClick={this.cancelButtonClick.bind(this)}>
          {translate("globals.cancel")}
        </Button>
      </div>
    );
  }

  handleFileNameChange(fileName) {
    this.setState(state => ({
      ...state,
      fileName: fileName
    }));
  }

  render() {
    const { fileName } = this.state;
    return (
      <Modal
        ModalFooterContent={this.saveCancelButtons.bind(this)}
        {...this.props}
        className={"NewFolderModal"}
      >
        <Input
          inputValue={this.handleFileNameChange}
          placeholder={translate("globals.fileManager.folderName")}
          initialValue={fileName}
        />
        <p className={styles.ErrorBox} hidden={!this.error}>
          {translate("globals.required")}
        </p>
      </Modal>
    );
  }
}

export default NewFolderModal;
