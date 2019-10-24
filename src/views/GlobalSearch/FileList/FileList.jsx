import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Media } from 'reactstrap';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import File from 'assets/images/download_file_icon.png'
import Folder from 'assets/images/folder_icon.png';

import CollaborativeSpaceFolderModel from "models/CollaborativeSpaceFolderModel";
import CollaborativeSpaceFileModel from "models/CollaborativeSpaceFileModel";

import styles from './FileList.module.scss';
import moment from "moment/moment";

@observer
class FileList extends Component {
  @observable false = true;

  constructor() {
    super();
    this.renderList = this.renderList.bind(this);
  }

  checkIfFolder(element) {
    return (element instanceof CollaborativeSpaceFolderModel);
  }

  checkType(element) {
    if (element instanceof CollaborativeSpaceFolderModel) {
      return Folder;
    } else if (element instanceof CollaborativeSpaceFileModel) {
      return File;
    } else {
      return null;
    }
  }

  handleDoubleClick(element, event) {
    const { history } = this.props;
    if (this.checkIfFolder(element)) {
      history.push(`/myCollaborativeSpace?parentId=${element.id}`);
    } else {
      window.open(element.downloadLink);
    }
  }

  renderList(fileList) {
    if (fileList && fileList.length > 0) {
      return fileList.map((element, index) => {
        return (
          <ListGroupItem
            key={element.id}
            onDoubleClick={this.handleDoubleClick.bind(this, element)}
            data-item={`data-item-index-${index}`}
            action
          >
            <div className={styles.FileItem}>
              <Media src={this.checkType(element)}/>
              <span>{element.name}</span>
            </div>
            <div className={styles.FileInfo}>
              <span>Par Nom de l’utilisateur {element.createdBy}</span>
              <span>Dernière modification le {moment(element.lastModificationDate).format('D MMM YYYY')}</span>
            </div>
          </ListGroupItem>
        );
      })
    }
  }

  render() {
    const { fileList } = this.props;
    return (
      <div className={styles.CollaborativeList}>
        <ListGroup>
          {this.renderList(fileList)}
        </ListGroup>
      </div>
    );
  }
}

export default FileList;
