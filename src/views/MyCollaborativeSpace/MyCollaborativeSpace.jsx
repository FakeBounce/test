import React, { Component } from "react";
import { Container } from "reactstrap";
import { translate } from "common/methods/translations";

import { observer } from "mobx-react";
import { observable } from "mobx";
import qs from "query-string";

import MainLayout from "components/MainLayout/MainLayout.jsx";
import Header from "elements/Header";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.jsx";
import NewFolderModal from "components/Modals/NewFolderModal/NewFolderModal";
import NewFileModal from "components/Modals/NewFileModal/NewFileModal";
import CollaborativeSpaceService from "services/CollaborativeSpaceService";
import SearchBox from "components/SearchBox/SearchBox";
import ButtonsBox from "./ButtonsBox/ButtonsBox";
import FileList from "./FileList/FileList";
import Loader from "components/Loader/Loader.jsx";

import CollaborativeSpaceStore from "stores/CollaborativeSpaceStore";
import styles from "./MyCollaborativeSpace.module.scss";
import CurrentCollectiviteStore from "stores/CurrentCollectiviteStore";
import ReactGA from "react-ga";
import FileInformationModal from "components/Modals/FileInformationModal/FileInformationModal";
import PermissionsModal from "../../components/Modals/PermissionsModal/PermissionsModal";

const breadcrumbElements = [
  { name: "home", href: "/home" },
  {
    name: "myCollaborativeSpace",
    href: "/myCollaborativeSpace",
    isActive: true
  }
];

@observer
class MyCollaborativeSpace extends Component {
  @observable dataFromApi = null;
  @observable selectedFile = null;
  @observable searchValue = "";
  @observable currentFolderId = "root";
  @observable newFolderModalOpen = false;
  @observable renameFolderModalOpen = false;
  @observable newFolderName = "";
  @observable confirmModalOpen = false;
  @observable newFileModalOpen = false;
  @observable isLoading = false;
  @observable rootFolderId = null;

  constructor() {
    super();

    this.state = {
      selectedFiles: [],
      isInfosModalOpen: false,
      infosModalFileIndex: -1,
      isPermissionsModalOpen: false
    };

    this.requestData = this.requestData.bind(this);
    this.setSelectedFile = this.setSelectedFile.bind(this);

    this.searchBoxValue = this.searchBoxValue.bind(this);
    this.requestSearch = this.requestSearch.bind(this);
    this.sortData = this.sortData.bind(this);
    this.createFolderButtonClick = this.createFolderButtonClick.bind(this);
    this.createFileButtonClick = this.createFileButtonClick.bind(this);
  }

  setSelectedFile(file = null) {
    if (file !== null && file.id) {
      const { selectedFiles } = this.state;
      let fileIndex = -1;
      const newSelectedFiles = [...selectedFiles];
      if (
        newSelectedFiles.filter((stateFile, index) => {
          if (stateFile.id === file.id) {
            fileIndex = index;
            return true;
          }
          return false;
        }).length > 0
      ) {
        newSelectedFiles.splice(fileIndex, 1);
      } else {
        newSelectedFiles.push(file);
      }
      this.setState(state => ({
        ...state,
        selectedFiles: newSelectedFiles
      }));
    }
  }

  async componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "MyCollaborativeSpace"
    });

    ReactGA.event({
      category: `Global`,
      action: "MyCollaborativeSpace"
    });

    const currentParentId = await this.getParentId();
    this.requestData({ searchPhrase: null, parentId: currentParentId });
  }

  async getParentId() {
    const { location } = this.props;
    const parentId = qs.parse(location.search).parentId;
    if (parentId) {
      window.history.replaceState({}, document.title, "/myCollaborativeSpace");
      return parentId;
    } else {
      await CurrentCollectiviteStore.fetchCurrentCollectiviteInformations();
      const {
        currentCollectivite: { rootFolderId }
      } = CurrentCollectiviteStore;
      this.rootFolderId = rootFolderId;
      return rootFolderId;
    }
  }

  async requestData(params) {
    this.isLoading = true;
    this.currentFolderId = params.parentId;
    this.dataFromApi = await CollaborativeSpaceStore.fetchCollaborativeSpaceSearchElements(
      params.parentId,
      params.searchPhrase
    );
    if (params.isChangingFolder) {
      this.searchValue = "";
    }
    this.isLoading = false;
    return true;
  }

  async getSortedData(sortType) {
    this.dataFromApi = await CollaborativeSpaceStore.getSortedElements(
      sortType
    );
  }

  searchBoxValue(value) {
    this.searchValue = value;
  }

  requestSearch() {
    if (this.searchValue === "") {
      this.requestData({ searchPhrase: null, parentId: this.rootFolderId });
    } else {
      this.requestData({
        searchPhrase: this.searchValue,
        parentId: this.rootFolderId
      });
    }
  }

  sortData(sortAsc) {
    this.getSortedData(sortAsc ? "ASC" : "DESC");
  }

  async confirmNewFolderModalYesButtonClick(folderName) {
    this.newFolderModalOpen = false;
    this.newFolderName = folderName;
    await CollaborativeSpaceService.createFolder({
      name: this.newFolderName,
      parentId: this.currentFolderId
    });
    this.requestData({ searchPhrase: null, parentId: this.currentFolderId });
    this.newFolderName = null;
  }

  confirmNewFolderModalNoButtonClick() {
    this.newFolderModalOpen = false;
  }

  createFolderButtonClick() {
    this.newFolderModalOpen = true;
  }

  confirmRenameFolderModalYesButtonClick = async folderName => {
    const { infosModalFileIndex } = this.state;
    this.renameFolderModalOpen = false;
    if (infosModalFileIndex > -1) {
      await CollaborativeSpaceService.renameFolder({
        name: folderName,
        parentId: this.currentFolderId,
        id: this.dataFromApi[infosModalFileIndex].id
      });
      this.requestData({ searchPhrase: null, parentId: this.currentFolderId });
      this.setState(state => ({
        ...state,
        infosModalFileIndex: -1
      }));
    }
  };

  confirmRenameFolderModalNoButtonClick = () => {
    this.renameFolderModalOpen = false;
    this.setState(state => ({
      ...state,
      infosModalFileIndex: -1
    }));
  };

  renameFolderButtonClick = index => {
    this.renameFolderModalOpen = true;
    this.setState(state => ({
      ...state,
      infosModalFileIndex: index
    }));
  };

  createFileButtonClick() {
    this.newFileModalOpen = true;
  }

  async confirmNewFileModalYesButtonClick(files) {
    this.newFileModalOpen = false;

    for (var i = 0; i < files.length; i++) {
      let fileFormData = new FormData();
      fileFormData.append("files", files[i]);
      await CollaborativeSpaceService.createFile({
        fileFormData,
        parentFolderId: this.currentFolderId
      });
    }

    this.requestData({ searchPhrase: null, parentId: this.currentFolderId });
  }

  confirmNewFileModalNoButtonClick() {
    this.newFileModalOpen = false;
  }

  deleteElement = async (element, index) => {
    const response = await CollaborativeSpaceStore.deleteElement(
      element,
      index
    );
    this.dataFromApi = response;
  };

  selectAll = () => {
    this.setState(state => ({
      ...state,
      selectedFiles: [...this.dataFromApi]
    }));
  };

  unselectAll = () => {
    this.setState(state => ({
      ...state,
      selectedFiles: []
    }));
  };

  toggleFileInformationModal = (bool = false) => (fileIndex = -1) => {
    this.setState(state => ({
      ...state,
      isInfosModalOpen: bool,
      infosModalFileIndex: bool ? fileIndex : -1
    }));
  };

  toggleFilePermissionModal = (bool = false) => (fileIndex = -1) => {
    this.setState(state => ({
      ...state,
      isPermissionsModalOpen: bool,
      infosModalFileIndex: bool ? fileIndex : -1
    }));
  };

  render() {
    const {
      selectedFiles,
      isInfosModalOpen,
      infosModalFileIndex,
      isPermissionsModalOpen
    } = this.state;
    return (
      <MainLayout {...this.props}>
        <Container fluid>
          <Loader show={this.isLoading} />
          <Breadcrumbs elements={breadcrumbElements} />
          <Header>{translate("globals.menu.myCollaborativeSpace")}</Header>
          <div className={styles.TopBar}>
            <SearchBox
              requestSearch={this.requestSearch}
              searchedValue={this.searchBoxValue}
              placeholder={translate("myCollaborativeSpace.searchPlaceholder")}
            />
            <ButtonsBox
              selectedFiles={selectedFiles}
              createFileButtonClick={this.createFileButtonClick}
              createFolderButtonClick={this.createFolderButtonClick}
            />
          </div>
          <FileList
            setSelectedFile={this.setSelectedFile}
            requestData={this.requestData}
            fileList={this.dataFromApi}
            currentFolderId={this.currentFolderId}
            sortAsc={this.sortData}
            rootFolderId={this.rootFolderId}
            selectedFiles={selectedFiles}
            searchValue={this.searchValue}
            deleteElement={this.deleteElement}
            selectAll={this.selectAll}
            unselectAll={this.unselectAll}
            toggleFileInformationModal={this.toggleFileInformationModal(true)}
            toggleFilePermissionModal={this.toggleFilePermissionModal(true)}
            renameFolderButtonClick={this.renameFolderButtonClick}
          />
        </Container>
        <NewFolderModal
          isOpen={this.newFolderModalOpen}
          title={translate("globals.fileManager.newFolder")}
          handleYesButtonClick={this.confirmNewFolderModalYesButtonClick.bind(
            this
          )}
          handleNoButtonClick={this.confirmNewFolderModalNoButtonClick.bind(
            this
          )}
          toggle={this.confirmNewFolderModalNoButtonClick.bind(this)}
        />
        <NewFolderModal
          isOpen={this.renameFolderModalOpen}
          title={translate("globals.fileManager.rename")}
          handleYesButtonClick={this.confirmRenameFolderModalYesButtonClick}
          handleNoButtonClick={this.confirmRenameFolderModalNoButtonClick}
          toggle={this.confirmRenameFolderModalNoButtonClick}
          isRenaming
          currentName={
            infosModalFileIndex !== -1
              ? this.dataFromApi[infosModalFileIndex].name
              : ""
          }
        />
        <NewFileModal
          isOpen={this.newFileModalOpen}
          title={translate("globals.fileManager.addFiles")}
          handleYesButtonClick={this.confirmNewFileModalYesButtonClick.bind(
            this
          )}
          handleNoButtonClick={this.confirmNewFileModalNoButtonClick.bind(this)}
          toggle={this.confirmNewFileModalNoButtonClick.bind(this)}
        />
        <FileInformationModal
          isOpen={isInfosModalOpen}
          title={translate("myCollaborativeSpace.modals.infosTitle")}
          toggle={this.toggleFileInformationModal(false)}
          username={
            infosModalFileIndex !== -1
              ? this.dataFromApi[infosModalFileIndex].createdBy
              : ""
          }
          creationDate={
            infosModalFileIndex !== -1
              ? this.dataFromApi[infosModalFileIndex].creationDate || ""
              : ""
          }
          lastUpdateDate={
            infosModalFileIndex !== -1
              ? this.dataFromApi[infosModalFileIndex].lastModificationDate
              : ""
          }
        />
        <PermissionsModal
          isOpen={isPermissionsModalOpen}
          title={translate("myCollaborativeSpace.modals.permissionsTitle")}
          toggle={this.toggleFilePermissionModal(false)}
          file={
            infosModalFileIndex !== -1
              ? this.dataFromApi[infosModalFileIndex]
              : null
          }
        />
      </MainLayout>
    );
  }
}

export default MyCollaborativeSpace;
