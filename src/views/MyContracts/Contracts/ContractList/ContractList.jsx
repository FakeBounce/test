import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Media} from 'reactstrap';
import {observer} from 'mobx-react';
import {observable} from "mobx";
import { translate } from "common/methods/translations";

import Contract from 'assets/images/contract_icon.png'
import FileDropdown from '../FileDropdown/FileDropdown.jsx';

import styles from './ContractList.module.scss';

@observer
class ContractList extends Component {
  @observable activeElementIndex = 'data-item-index';
  @observable ascSort = false;

  constructor() {
    super();
    this.toggleFiles = this.toggleFiles.bind(this);
  }

  toggleFiles() {
    this.dropdownFiles = !this.dropdownFiles;
  }

  renderList(contractList) {
    if (contractList && contractList.length > 0) {
      return contractList.map((element, index) => {
        return (
          <ListGroupItem key={`contract-${index}`} className="justify-content-between" style={{marginBottom: '30px'}}>
            <div className={styles.Select}/>
            <div className={styles.ContractItem}>
              <div className={styles.ContractName}>
                <Media src={Contract} />
                <p>{element.number}</p>
              </div>
              <div className={styles.ContractInfo}>
                <div>
                  <h4>{element.name}</h4>
                  <p>{element.place}</p>
                </div>
                <p>{element.numberOfMaterials ? translate('myContracts.contracts.numberOfMaterials', { number: element.numberOfMaterials }) : ''}</p>
              </div>
            </div>
            <div className={styles.Download}>
              <FileDropdown files={element.files}></FileDropdown>
            </div>
          </ListGroupItem>
        );
      })
    }
  }

  render() {
    const {contractList} = this.props;
    return (
        <ListGroup>
          {this.renderList(contractList)}
        </ListGroup>
    );
  }
}

export default ContractList;
