import React, {Component} from 'react';
import {Button, ListGroup, ListGroupItem, Media} from 'reactstrap';
import {observer} from 'mobx-react';
import {observable} from "mobx";
import { translate } from "common/methods/translations";

import File from 'assets/images/download_file_icon.png'
import Folder from 'assets/images/folder_icon.png';

import ContractStore from 'stores/ContractStore';
import ContractFolderModel from "models/ContractFolderModel";
import ContractFileModel from "models/ContractFileModel";

import styles from './FileList.module.scss';
import moment from "moment/moment";

@observer
class FileList extends Component {
  @observable activeElementIndex = 'data-item-index';
  @observable ascSort = false;
  @observable maxWidth = null;
  @observable areItemsDisabled = false;

  constructor() {
    super();
    this.renderList = this.renderList.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.switchSort = this.switchSort.bind(this);
  }

  componentWillMount() {
    this.maxWidthElement();
  }

  maxWidthElement() {
    const self = this;
    if (self.maxWidth === styles.WidthMax) {
      self.maxWidth = null;
    }
    setTimeout(function () {
      self.maxWidth = styles.WidthMax;
    }, 1700)
  }

  checkIfFolder(element) {
    return (element instanceof ContractFolderModel);
  }

  checkType(element) {
    if (element instanceof ContractFolderModel) {
      return Folder;
    } else if (element instanceof ContractFileModel) {
      return File;
    } else {
      return null;
    }
  }

  async handleElementClick(element, event) {
    const {setSelectedFile} = this.props;
    if (this.checkIfFolder(element) && !this.areItemsDisabled) {
      this.areItemsDisabled = true;
      this.activeElementIndex = 'data-item-index';
      setSelectedFile(null);
      const {requestData} = this.props;
      await requestData({documentName: null, parentId: element.id});
      this.areItemsDisabled = false;
      return;
    }
    this.activeElementIndex = event.currentTarget.getAttribute('data-item');
    setSelectedFile(element);
    this.maxWidthElement();
  }

  async handleReturn() {
    this.activeElementIndex = 'data-item-index';
    const {requestData, currentFolderId} = this.props;
    const parentId = await ContractStore.getElementsParentId(currentFolderId);
    requestData({documentName: null, parentId});
    this.maxWidthElement();
  }

  renderList(fileList) {
    if (fileList && fileList.length > 0) {
      return fileList.map((element, index) => {
        return (
          <ListGroupItem
            disabled={this.areItemsDisabled}
            key={element.id}
            onClick={this.handleElementClick.bind(this, element)}
            data-item={`data-item-index-${index}`}
            action
            className={this.maxWidth}
            active={this.activeElementIndex === `data-item-index-${index}`}
          >
            <div className={styles.FileItem}>
              <Media src={this.checkType(element)}/>
              <span>{element.name}</span>
            </div>
            <div className={styles.FileInfo}>
              <span>Par {element.createdBy}</span>
              <span>Dernière modification le {moment(element.lastModificationDate).format('D MMM YYYY')}</span>
            </div>
          </ListGroupItem>
        );
      })
    }
  }

  switchSort() {
    const {sortAsc} = this.props;
    this.ascSort = !this.ascSort;
    sortAsc(this.ascSort);
  }

  render() {
    const {fileList} = this.props;
    return (
      <div className={styles.CollaborativeList}>
        <Button disabled={this.props.currentFolderId === this.props.rootFolderId}
                onClick={this.handleReturn}>{translate('globals.return')}</Button>
        <div className={styles.SortContainer}>
          <span>{`${(fileList && fileList.length > 0) ? fileList.length : 0}`} {fileList && fileList.length > 1 ? 'éléments' : 'élément'  }</span>
          {/* <span className={styles.ClickTextCursor}
                onClick={this.switchSort}>
            {translate('globals.sortBy')}{` ${this.ascSort ? 'Z - A' : 'A - Z'}`}
            </span> */}
        </div>
        <ListGroup>
          {this.renderList(fileList)}
        </ListGroup>
      </div>
    );
  }
}

export default FileList;
