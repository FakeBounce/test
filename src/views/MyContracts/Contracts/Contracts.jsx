import React, { Component } from "react";
import styles from "./Contracts.module.scss";
import { observer } from 'mobx-react';
import { observable } from "mobx";
import { Row, Col } from "reactstrap";
import { translate } from "common/methods/translations";

import SearchBox from 'components/SearchBox/SearchBox';
import NewFolderModal from 'components/Modals/NewFolderModal/NewFolderModal';
import NewFileModal from 'components/Modals/NewFileModal/NewFileModal';
import ContractStore from "stores/ContractStore";
import ContractService from 'services/ContractService';
import Loader from 'components/Loader/Loader.jsx';
import ButtonsBox from './ButtonsBox/ButtonsBox.jsx';
import FileList from './FileList/FileList.jsx';

import CurrentCollectiviteStore from "stores/CurrentCollectiviteStore";

@observer
class Contracts extends Component {
  @observable dropdownFiles = false;
  @observable contractList = [];
  @observable searchValue = null;
  @observable loading = false;

  @observable currentFolderId = 'root';
  @observable selectedFile = null;
  @observable newFolderModalOpen = false;
  @observable newFolderName = '';
  @observable confirmModalOpen = false;
  @observable newFileModalOpen = false;
  @observable dataFromApi = null;

  constructor() {
    super();
    this.requestData = this.requestData.bind(this);
    this.setSelectedFile = this.setSelectedFile.bind(this);
    this.toggleFiles = this.toggleFiles.bind(this);
    this.searchBoxValue = this.searchBoxValue.bind(this);
    this.searchContracts = this.searchContracts.bind(this);
    this.createFolderButtonClick = this.createFolderButtonClick.bind(this);
    this.createFileButtonClick = this.createFileButtonClick.bind(this);
  }

  async componentDidMount() {
    this.contractList = this.props.contracts;
    await this.fetchFiles(this.contractList);
    const currentParentId = await this.getParentId();
    this.requestData({ searchPhrase: null, parentId: currentParentId });
  }

  async confirmNewFolderModalYesButtonClick(folderName) {
    this.newFolderModalOpen = false;
    this.newFolderName = folderName;
    await ContractService.createFolder({ name: this.newFolderName, parentId: this.currentFolderId, creePar : "Mario" });
    this.requestData({ searchPhrase: null, parentId: this.currentFolderId });
    this.newFolderName = null;
  }

  async getParentId() {
    // const { location } = this.props;
    // const parentId = qs.parse(location.search).parentId;
    // if (parentId) {
    //   window.history.replaceState({}, document.title, '/myCollaborativeSpace');
    //   return parentId;
    // } else {
      await CurrentCollectiviteStore.fetchCurrentCollectiviteInformations();
      const { currentCollectivite: { contratsRootFolderId } } = CurrentCollectiviteStore;
      this.contratsRootFolderId = contratsRootFolderId;
      return contratsRootFolderId;
    // }
  }

  async requestData(params) {
    this.isLoading = true;
    this.currentFolderId = params.parentId;
    this.dataFromApi = await ContractStore.fetchContractElements(params);
    this.isLoading = false;
    return true;
  }

  confirmNewFolderModalNoButtonClick() {
    this.newFolderModalOpen = false;
  }

  createFolderButtonClick() {
    this.newFolderModalOpen = true;
  }

  createFileButtonClick() {
    this.newFileModalOpen = true;
  }

  async confirmNewFileModalYesButtonClick(files) {
    this.newFileModalOpen = false;
      
    for (var i = 0; i < files.length ; i++) {
      let fileFormData = new FormData();
      fileFormData.append("files", files[i]);
      await ContractService.createFile({ fileFormData, parentFolderId: this.currentFolderId });
    }
    
    this.requestData({ searchPhrase: null, parentId: this.currentFolderId });
  }

  confirmNewFileModalNoButtonClick() {
    this.newFileModalOpen = false;
  }


  async searchContracts() {
    this.contractList = await ContractStore.searchContract(this.searchValue);
    await this.fetchFiles(this.contractList);
  }

  async fetchFiles(contracts) {
    for (const contract of contracts) {
      contract.files = await ContractService.getFiles(contract.id);
    }
  }

  setSelectedFile(file) {
    this.selectedFile = file;
  }

  searchBoxValue(value) {
    this.searchValue = value;
  }

  toggleFiles() {
    this.dropdownFiles = !this.dropdownFiles;
  }

  static tabName = 'Contracts';

  render() {
    return (
      <div className={styles.Contracts}>
        <Row>
          <Col sm="12">
            <div className={styles.TabBox}>
              <div className={styles.TopBar}>
                <div className={styles.SearchBox}>
                  <SearchBox
                    requestSearch={this.searchContracts}
                    searchedValue={this.searchBoxValue}
                    placeholder={translate('myContracts.contracts.searchPlaceholder')}
                  />
                </div>
                <div className={styles.ButtonsBox}>
                  <ButtonsBox
                    selectedFile={this.selectedFile}
                    createFileButtonClick={this.createFileButtonClick}
                    createFolderButtonClick={this.createFolderButtonClick}
                  />
                </div>
              </div>
              <Loader show={this.loading}/>
              {/* <div className={styles.ContractsList}>
                <ContractList contractList={this.contractList}/>
              </div> */}
              <FileList
                setSelectedFile={this.setSelectedFile}
                requestData={this.requestData}
                fileList={this.dataFromApi}
                currentFolderId={this.currentFolderId}
                sortAsc={this.sortData}
                rootFolderId={this.contratsRootFolderId}
              />
            </div>
          </Col>
        </Row>
        <NewFolderModal
          isOpen={this.newFolderModalOpen}
          title={translate('globals.fileManager.newFolder')}
          handleYesButtonClick={this.confirmNewFolderModalYesButtonClick.bind(this)}
          handleNoButtonClick={this.confirmNewFolderModalNoButtonClick.bind(this)}
          toggle={this.confirmNewFolderModalNoButtonClick.bind(this)}
        />
        <NewFileModal
          isOpen={this.newFileModalOpen}
          title={translate('globals.fileManager.addFiles')}
          handleYesButtonClick={this.confirmNewFileModalYesButtonClick.bind(this)}
          handleNoButtonClick={this.confirmNewFileModalNoButtonClick.bind(this)}
          toggle={this.confirmNewFileModalNoButtonClick.bind(this)}
        />
      </div>
    )
  }
}

export default Contracts;
