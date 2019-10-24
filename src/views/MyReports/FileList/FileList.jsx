import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from "mobx";
import {Media, ListGroup, ListGroupItem,} from 'reactstrap';
import moment from 'moment';
import { translate } from "common/methods/translations";

import File from 'assets/images/download_file_icon.png';

import styles from './FileList.module.scss';

@observer
class FileList extends Component {
  @observable activeElementIndex = 'file-item-index';
  @observable actualPage = 0;

  constructor() {
    super();
    this.setSelectedElement = this.setSelectedElement.bind(this);
  }

  componentDidMount() {
    this.activeElementIndex = 'file-item-index';
  }

  componentWillUpdate() {
    const {actualPage} = this.props;
    if (this.actualPage !== actualPage) {
      this.actualPage = actualPage;
      this.activeElementIndex = 'file-item-index';
    }
  }

  setSelectedElement(element, event) {
    const {selectedFile} = this.props;
    selectedFile(element);
    this.activeElementIndex = event.currentTarget.getAttribute('data-item');

  }

  renderFilesList(files) {
    if (files && files.length > 0) {
      return (files.map((file, index) => {
        return (
          <ListGroupItem
            key={index}
            tag="li"
            href="#"
            data-item={`file-item-index-${index}`}
            onClick={(event) => {
              this.setSelectedElement(file, event)
            }}
            action
            active={this.activeElementIndex === `file-item-index-${index}`}
          >
            <div className={styles.FileItem}>
              <Media src={File}/>
              <span>{file.name}</span>
            </div>
            <div className={styles.FileInfo}>
              <span>{moment(file.date).format('L')}</span>
            </div>
          </ListGroupItem>
        );
      }));
    }else{
      return(
        <div>{translate('searchPage.noResults')}</div>
      );
    }
  };

  render() {
    const {files} = this.props;

    return (
      <div className={styles.CollaborativeList}>
        <ListGroup>
          {this.renderFilesList(files)}
        </ListGroup>
      </div>
    );
  }
}

export default FileList;
