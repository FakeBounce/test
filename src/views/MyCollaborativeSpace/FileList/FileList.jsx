import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem, Media } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { translate } from "common/methods/translations";

import File from "assets/images/download_file_icon.png";
import Folder from "assets/images/folder_icon.png";
import Doc from "assets/images/myEspaceCo/doc.svg";
import Jpg from "assets/images/myEspaceCo/jpg.svg";
import Pdf from "assets/images/myEspaceCo/pdf.svg";
import Txt from "assets/images/myEspaceCo/txt.svg";
import Dl from "assets/images/myEspaceCo/dl.svg";
// import Acess from "assets/images/myEspaceCo/acess.svg";
import Delete from "assets/images/myEspaceCo/delete.svg";
import Info from "assets/images/myEspaceCo/info.svg";
import Edit from "assets/images/myEspaceCo/edit.svg";
import Selected from "assets/images/myEspaceCo/selected.svg";
// import Tick from "assets/images/tick.png";

import CollaborativeSpaceStore from "stores/CollaborativeSpaceStore";
import CollaborativeSpaceFolderModel from "models/CollaborativeSpaceFolderModel";
import CollaborativeSpaceFileModel from "models/CollaborativeSpaceFileModel";

import CollaborativeSpaceService from "services/CollaborativeSpaceService";

import styles from "./FileList.module.scss";
import moment from "moment/moment";

@observer
class FileList extends Component {
  @observable activeElementIndex = [];
  @observable ascSort = false;
  @observable maxWidth = null;
  @observable areItemsDisabled = false;

  constructor() {
    super();

    this.state = {
      selectedItemOption: -1
    };
    this.renderList = this.renderList.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.switchSort = this.switchSort.bind(this);
  }

  componentDidMount() {
    this.maxWidthElement();
  }

  maxWidthElement() {
    const self = this;
    if (self.maxWidth === styles.WidthMax) {
      self.maxWidth = null;
    }
    setTimeout(function() {
      self.maxWidth = styles.WidthMax;
    }, 1700);
  }

  checkIfFolder(element) {
    return element instanceof CollaborativeSpaceFolderModel;
  }

  checkType(element) {
    if (element instanceof CollaborativeSpaceFolderModel) {
      return Folder;
    } else if (element instanceof CollaborativeSpaceFileModel) {
      return this.whatsMyFile(element.name);
    } else {
      return null;
    }
  }

  whatsMyFile(fileName) {
    switch (fileName.slice(fileName.indexOf(".") + 1).toLowerCase()) {
      //Doc
      case "doc":
        return Doc;
      case "docx":
        return Doc;
      //Image
      case "jpg":
        return Jpg;
      //Pdf
      case "pdf":
        return Pdf;
      //Txt
      case "txt":
        return Txt;
      default:
        return File;
    }
  }

  async handleElementClick(element, event) {
    const { setSelectedFile } = this.props;

    this.activeElementIndex.push(event.currentTarget.getAttribute("data-item"));
    setSelectedFile(element);
    this.showItemOptions(-1)();
    this.maxWidthElement();
  }

  async handleDownloadFile(selectedFile) {
    try {
      const response = await CollaborativeSpaceService.downloadFile(
        selectedFile
      );
      response.blob().then(blob => {
        if (navigator.appVersion.toString().indexOf(".NET") > 0) {
          window.navigator.msSaveBlob(blob, selectedFile.name);
        } else {
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob);
          link.href = url;
          link.download = selectedFile.name;
          link.click();
        }
      });
    } catch (e) {
      console.error("Failed to get file");
      return null;
    }
  }

  handleDoubleClick = element => async () => {
    const { unselectAll } = this.props;
    try {
      if (this.checkIfFolder(element) && !this.areItemsDisabled) {
        this.areItemsDisabled = true;
        const fileIndex = this.activeElementIndex.indexOf(element);
        if (fileIndex > -1) {
          this.activeElementIndex.splice(fileIndex, 1);
        }
        const { requestData } = this.props;
        await requestData({
          parentId: element.id,
          isChangingFolder: true
        });
        this.activeElementIndex = [];
        unselectAll();
        this.areItemsDisabled = false;
      } else {
        const response = await CollaborativeSpaceService.downloadFile(element);
        response.blob().then(blob => {
          if (navigator.appVersion.toString().indexOf(".NET") > 0) {
            window.navigator.msSaveBlob(blob, element.name);
          } else {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = element.name;
            link.click();
          }
        });
      }
    } catch (e) {
      console.error("Failed to get file");
      return null;
    }
  };

  async handleReturn() {
    this.activeElementIndex = [];
    const { requestData, currentFolderId } = this.props;
    const parentId = await CollaborativeSpaceStore.getElementsParentId(
      currentFolderId
    );
    requestData({ documentName: null, parentId });
    this.maxWidthElement();
  }

  showItemOptions = itemIndex => () => {
    this.setState(state => ({
      ...state,
      selectedItemOption:
        itemIndex === state.selectedItemOption ? -1 : itemIndex
    }));
  };

  renameFolderButtonClickAndToggleOption = index => () => {
    const { renameFolderButtonClick } = this.props;
    this.showItemOptions(-1)();
    renameFolderButtonClick(index);
  };

  toggleFileInformationModalAndToggleOption = index => () => {
    const { toggleFileInformationModal } = this.props;
    this.showItemOptions(-1)();
    toggleFileInformationModal(index);
  };

  toggleFilePermissionModalAndToggleOption = index => () => {
    const { toggleFilePermissionModal } = this.props;
    this.showItemOptions(-1)();
    toggleFilePermissionModal(index);
  };

  deleteElementAndToggleOption = (element, index) => () => {
    const { deleteElement } = this.props;
    this.showItemOptions(-1)();
    deleteElement(element, index);
  };

  renderList(fileList) {
    const { selectedItemOption } = this.state;
    const { selectedFiles } = this.props;
    if (fileList && fileList.length > 0) {
      return fileList.map((element, index) => {
        return (
          <ListGroupItem
            disabled={this.areItemsDisabled}
            key={element.id}
            data-item={`data-item-index-${index}`}
            action
            className={this.maxWidth}
            active={
              selectedFiles.filter(stateFile => stateFile.id === element.id)
                .length > 0
            }
          >
            <div className={styles.selectedImage}>
              {selectedFiles.filter(stateFile => stateFile.id === element.id)
                .length > 0 && <Media src={Selected} />}
            </div>
            {/*<div className={styles.FileTick}>*/}
            {/*  <div>*/}
            {/*    <Media src={Tick} />*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div
              onClick={this.handleElementClick.bind(this, element)}
              onDoubleClick={this.handleDoubleClick(element)}
              className={styles.FileContainer}
            >
              <div className={styles.FileItem}>
                <Media src={this.checkType(element)} />
                <span>{element.name}</span>
              </div>
              <div className={styles.FileInfo}>
                <span>Par {element.createdBy}</span>
                <span>
                  Dernière modification le{" "}
                  {moment(element.lastModificationDate).format("D MMM YYYY")}
                </span>
              </div>
            </div>
            <div
              className={styles.FileOptions}
              onClick={this.showItemOptions(index)}
            >
              <span> ●</span>
              <span> ●</span>
              <span> ●</span>
            </div>

            {selectedItemOption === index && (
              <div className={styles.FileOptionsModal}>
                <div
                  className={styles.FileOptionsListItem}
                  onClick={() => {
                    this.handleDownloadFile(element);
                    this.showItemOptions(-1)();
                  }}
                >
                  <Media src={Dl} /> <span>Télécharger</span>
                </div>
                <div
                  className={styles.FileOptionsListItem}
                  onClick={this.toggleFileInformationModalAndToggleOption(
                    index
                  )}
                >
                  <Media src={Info} /> <span>Afficher les détails</span>
                </div>
                {this.checkType(element) === Folder && (
                  <div
                    className={styles.FileOptionsListItem}
                    onClick={this.renameFolderButtonClickAndToggleOption(index)}
                  >
                    <Media src={Edit} /> <span>Renommer</span>
                  </div>
                )}
                {/*<div*/}
                {/*  className={styles.FileOptionsListItem}*/}
                {/*  onClick={this.toggleFilePermissionModalAndToggleOption(index)}*/}
                {/*>*/}
                {/*  <Media src={Acess} /> <span>Modifier les permissions</span>*/}
                {/*</div>*/}
                <div
                  className={styles.FileOptionsListItem}
                  onClick={this.deleteElementAndToggleOption(element, index)}
                >
                  <Media src={Delete} /> <span>Supprimer</span>
                </div>
              </div>
            )}
          </ListGroupItem>
        );
      });
    }
  }

  switchSort() {
    const { sortAsc } = this.props;
    this.ascSort = !this.ascSort;
    sortAsc(this.ascSort);
  }

  render() {
    const {
      fileList,
      searchValue,
      selectedFiles,
      selectAll,
      unselectAll
    } = this.props;
    return (
      <div className={styles.CollaborativeList}>
        <div className={styles.CollaborativeButtonList}>
          {searchValue === "" && (
            <Button
              disabled={this.props.currentFolderId === this.props.rootFolderId}
              onClick={this.handleReturn}
              className={styles.CollaborativeButton}
            >
              {translate("globals.return")}
            </Button>
          )}
          {selectedFiles.length === 0 && (
            <Button onClick={selectAll} className={styles.CollaborativeButton}>
              {translate("globals.selectAll")}
            </Button>
          )}
          {selectedFiles.length > 0 && (
            <Button
              onClick={unselectAll}
              className={styles.CollaborativeButton}
            >
              {translate("globals.unselectAll")}
            </Button>
          )}
        </div>
        <div className={styles.SortContainer}>
          <span>
            {`${fileList && fileList.length > 0 ? fileList.length : 0}`}{" "}
            {fileList && fileList.length > 1 ? "éléments" : "élément"}
          </span>
          {/*<span className={styles.ClickTextCursor} onClick={this.switchSort}>*/}
          {/*  {translate("globals.sortBy")}*/}
          {/*  {` ${this.ascSort ? "Z - A" : "A - Z"}`}*/}
          {/*</span>*/}
        </div>
        <ListGroup>{this.renderList(fileList)}</ListGroup>
      </div>
    );
  }
}

export default FileList;
