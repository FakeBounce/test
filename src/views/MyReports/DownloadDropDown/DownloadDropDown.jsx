import React, { Component } from 'react';
import styles from './DownloadDropDown.module.scss';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { observer } from 'mobx-react';
import { observable } from "mobx";

@observer
class DownloadDropDown extends Component {
  @observable dropdownDownload = false;
  @observable disableDownloadButtons = true;

  constructor() {
    super();
    this.toggleDownloadDropDown = this.toggleDownloadDropDown.bind(this);
  }

  checkPDFLink(selectedFile) {
    return selectedFile && selectedFile.pdfLink && selectedFile.pdfLink !== '';
  }
  checkXlsxLink(selectedFile) {
    return selectedFile && selectedFile.excelLink && selectedFile.excelLink !== '';
  }

  toggleDownloadDropDown() {
    this.dropdownDownload = !this.dropdownDownload;
    const { selectedFile } = this.props;
    if (this.checkPDFLink(selectedFile) && this.checkXlsxLink(selectedFile)) {
      this.disableDownloadButtons = false;
    }
  }

  downloadPdf() {
    const { selectedFile } = this.props;
    if (this.checkPDFLink(selectedFile)) {
      window.open(selectedFile.pdfLink);
    }
  }

  downloadXlsx() {
    const { selectedFile } = this.props;
    if (this.checkXlsxLink(selectedFile)) {
      window.open(selectedFile.excelLink);
    }
  }

  render() {
    return (
      <Dropdown
        isOpen={this.dropdownDownload}
        toggle={this.toggleDownloadDropDown}
      >
        <DropdownToggle className={styles.DownloadButton} />
        <DropdownMenu>
          <DropdownItem
            disabled={this.disableDownloadButtons}
            onClick={this.downloadPdf.bind(this)}
          >
            PDF
          </DropdownItem>
          <DropdownItem
            disabled={this.disableDownloadButtons}
            onClick={this.downloadXlsx.bind(this)}
          >
            Excel
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
export default DownloadDropDown;
