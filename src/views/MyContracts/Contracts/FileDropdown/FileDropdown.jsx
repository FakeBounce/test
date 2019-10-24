import React, { Component } from 'react';
import styles from './FileDropdown.module.scss';
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
// import { observable } from "mobx/lib/mobx";
import { observable } from "mobx";
import {observer} from 'mobx-react';
import { translate } from "common/methods/translations";


@observer
class ContactContainer extends Component {
  @observable dropdownFiles = false;

  constructor() {
    super();
    this.toggleFiles = this.toggleFiles.bind(this);
  }

  toggleFiles() {
    this.dropdownFiles = !this.dropdownFiles;
  }

  handleDownload(element) {
    window.open(element.downloadLink);
  }

  render() {
    const files = this.props.files || [];
    return (
      <Dropdown isOpen={this.dropdownFiles} toggle={this.toggleFiles}>
        <DropdownToggle className={styles.DownloadFile}/>
        <DropdownMenu className={styles.DropdownMenu}>
          { files && files.map((file, index) => {
            return <DropdownItem key={`file-${index}`} onClick={this.handleDownload.bind(this, file)}>{file.name}</DropdownItem>
          })}
          { !files.length && <p className={styles.NoDocuments}>{ translate('myContracts.contracts.noFiles') }</p>}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ContactContainer;
