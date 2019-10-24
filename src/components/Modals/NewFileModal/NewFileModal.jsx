import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Media } from "reactstrap";

import { Button } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { translate } from "common/methods/translations";

import Modal from "elements/Modal/Modal";

class NewFileModal extends Component {
  constructor() {
    super();
    this.state = {
      files: null
    };
    this.renderUploadedFiles = this.renderUploadedFiles.bind(this);
  }

  saveButtonClick() {
    const { handleYesButtonClick } = this.props;
    const { files } = this.state;
    handleYesButtonClick(files);
    this.setState(state => ({
      ...state,
      files: null
    }));
  }

  cancelButtonClick() {
    const { handleNoButtonClick } = this.props;
    handleNoButtonClick();
    this.setState(state => ({
      ...state,
      files: null
    }));
  }

  saveCancelButtons() {
    return (
      <div>
        <Button color="primary" onClick={this.saveButtonClick.bind(this)}>
          {translate("globals.create")}
        </Button>
        <Button color="secondary" onClick={this.cancelButtonClick.bind(this)}>
          {translate("globals.cancel")}
        </Button>
      </div>
    );
  }

  onDrop(files) {
    this.setState(state => ({
      ...state,
      files
    }));
  }

  renderUploadedFiles() {
    const { files } = this.state;
    if (files && files.length > 0) {
      return files.map((file, index) => {
        if (file.name && file.preview)
          return (
            <div key={index}>
              <Media src={file.preview} />
              <p>{file.name}</p>
            </div>
          );
        return null;
      });
    }
    return (
      <p>
        {translate("globals.fileManager.uploadTitle")}.{" "}
        {translate("globals.fileManager.uploadSubtitle")}
      </p>
    );
  }

  render() {
    return (
      <Modal
        ModalFooterContent={this.saveCancelButtons.bind(this)}
        {...this.props}
        className={"NewFileModal"}
      >
        <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}>
          {this.renderUploadedFiles()}
        </Dropzone>
      </Modal>
    );
  }
}

export default NewFileModal;
