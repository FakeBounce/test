import React, { Component } from "react";
import { Button } from "reactstrap";
import { translate } from "common/methods/translations";

import { observer } from "mobx-react";
import { observable } from "mobx";
import CollaborativeSpaceService from "services/CollaborativeSpaceService";

import styles from "./ButtonsBox.module.scss";

@observer
class ButtonsBox extends Component {
  @observable dropdownNew = false;

  constructor() {
    super();
    this.toggleNew = this.toggleNew.bind(this);
    this.handleNewFile = this.handleNewFile.bind(this);
    this.handleNewFolder = this.handleNewFolder.bind(this);
  }

  async handleDownloadFile(selectedFiles) {
    try {
      selectedFiles.map(async file => {
        const response = await CollaborativeSpaceService.downloadFile(file);
        response.blob().then(blob => {
          if (navigator.appVersion.toString().indexOf(".NET") > 0) {
            window.navigator.msSaveBlob(blob, file.name);
          } else {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = file.name;
            link.click();
          }
        });
      });
    } catch (e) {
      console.error("Failed to get file");
      return null;
    }
  }

  toggleNew() {
    this.dropdownNew = !this.dropdownNew;
  }

  handleNewFile() {
    const { createFileButtonClick } = this.props;
    createFileButtonClick();
  }

  handleNewFolder() {
    const { createFolderButtonClick } = this.props;
    createFolderButtonClick();
  }

  render() {
    const { selectedFiles } = this.props;
    return (
      <div className={styles.ButtonsBox}>
        {/* <Dropdown isOpen={this.dropdownNew} toggle={this.toggleNew}>
          <DropdownToggle className={styles.NewButton}>{translate('globals.addNew')}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.handleNewFile} className={styles.File}>{translate('myCollaborativeSpace.file')}</DropdownItem>
            <DropdownItem onClick={this.handleNewFolder} className={styles.Directory}>{translate('myCollaborativeSpace.directory')}</DropdownItem>
          </DropdownMenu>
        </Dropdown> */}{" "}
        <Button onClick={this.handleNewFolder} className={styles.NewFolder}>
          {translate("globals.addNew")}
        </Button>
        <Button onClick={this.handleNewFile} className={styles.NewFile}>
          {translate("myCollaborativeSpace.upload")}
        </Button>
        <Button
          className={styles.DownloadButton}
          size="lg"
          onClick={this.handleDownloadFile.bind(this, selectedFiles)}
          disabled={selectedFiles.length === 0}
        />
      </div>
    );
  }
}

export default ButtonsBox;
