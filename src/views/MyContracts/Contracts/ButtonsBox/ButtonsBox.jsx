import React, {Component} from 'react';
import {Button} from 'reactstrap';
import { translate } from "common/methods/translations";

import {observer} from 'mobx-react';
import {observable} from "mobx";
import ContractService from 'services/ContractService';
import styles from './ButtonsBox.module.scss';

@observer
class ButtonsBox extends Component {
  @observable dropdownNew = false;

  constructor() {
    super();
    this.toggleNew = this.toggleNew.bind(this);
    this.handleNewFile = this.handleNewFile.bind(this);
    this.handleNewFolder = this.handleNewFolder.bind(this);
  }

  async handleDownloadFile(selectedFile) {
    try {
      const response = await ContractService.downloadFile(selectedFile);
      response.blob().then(blob => {
        if (navigator.appVersion.toString().indexOf('.NET') > 0) {
          window.navigator.msSaveBlob(blob, selectedFile.name);
        } else {
          const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          console.log(url);
          link.href = url;
          link.download = selectedFile.name;
          link.click();
        }
      })
    } catch (e) {
      console.error('Failed to get file');
      return null;
    }
  }

  toggleNew() {
    this.dropdownNew = !this.dropdownNew;
  }

  handleNewFile() {
    const {createFileButtonClick} = this.props;
    createFileButtonClick();
  }

  handleNewFolder() {
    const {createFolderButtonClick} = this.props;
    createFolderButtonClick();
  }

  render() {
    const {selectedFile} = this.props;
    return (
      <div className={styles.ButtonsBox}>
        {/* <Dropdown isOpen={this.dropdownNew} toggle={this.toggleNew}>
          <DropdownToggle className={styles.NewButton}>{translate('globals.addNew')}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.handleNewFile} className={styles.File}>{translate('myCollaborativeSpace.file')}</DropdownItem>
            <DropdownItem onClick={this.handleNewFolder} className={styles.Directory}>{translate('myCollaborativeSpace.directory')}</DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        <Button 
          onClick={this.handleNewFolder} 
          className={styles.NewFolder}>{translate('globals.addNew')}</Button>
        <Button 
          onClick={this.handleNewFile} 
          className={styles.NewFile}>{translate('myContracts.contracts.upload')}</Button>
        {' '}
        <Button
          className={styles.DownloadButton}
          size="lg"
          onClick={this.handleDownloadFile.bind(this, selectedFile)}
          disabled={(!(selectedFile && selectedFile.downloadLink))}
        />
      </div>
    );
  }
}

export default ButtonsBox;
