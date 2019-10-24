import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ReactAvatarEditor from "react-avatar-editor";

import { Button } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { translate } from "common/methods/translations";

import Modal from "elements/Modal/Modal";
import styles from "./ImageModal.scss";

@observer
class ImageModal extends Component {
  @observable file = null;
  @observable errorNotice = null;

  constructor() {
    super();
    this.renderUploadedFiles = this.renderUploadedFiles.bind(this);
  }

  saveButtonClick() {
    const { handleYesButtonClick } = this.props;
    handleYesButtonClick(this.file ? this.file[0] : null);
    this.file = null;
    this.errorNotice = null;
  }

  cancelButtonClick() {
    const { handleNoButtonClick } = this.props;
    handleNoButtonClick();
    this.file = null;
    this.errorNotice = null;
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

  onDropRejected = e => {
    console.log(e);
    this.errorNotice = translate("globals.maxUpload", { size: "2 MB" });
  };

  onDrop(file) {
    this.file = file;
    this.errorNotice = null;
  }

  renderUploadedFiles() {
    if (this.file && this.file[0]) {
      return (
        <ReactAvatarEditor
          ref={this.props.setEditorRef}
          border={1}
          width={100}
          height={100}
          image={this.file[0]}
          borderRadius={50}
        />
      );
    }
    return this.errorNotice ? (
      <p className={styles.SizeError}>{this.errorNotice}</p>
    ) : (
      <p>
        {translate("myProfile.personalInformation.uploadTitle")}.{" "}
        {translate("myProfile.personalInformation.uploadSubtitle")}
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
        <Dropzone
          className="dropzone"
          accept="image/jpeg, image/png"
          onDrop={this.onDrop.bind(this)}
          onDropRejected={this.onDropRejected}
          maxSize={2097152}
        >
          {this.renderUploadedFiles()}
        </Dropzone>
      </Modal>
    );
  }
}

export default ImageModal;
