import ContractService from 'services/ContractService';
import ContractFileModel from "../models/ContractFileModel";
import ContractFolderModel from "../models/ContractFolderModel";

class ContractStore {
  contracts = [];
  elements = []; 

  async fetchContracts() {
    try {
      if (!this.contracts.length) {        
        this.contracts = await ContractService.getContracts();
      }
      return this.contracts;
    } catch (e) {
      console.error('Failed to fetch contracts data');
      return null;
    }
  }

  

  /**
   * Fetch all files and folders listed in given folder
   * @param {Object} parentFolderId, order = 'DESC'
   * @returns {Promise<*>} Elements
   */
  async fetchContractElements(params) {
    try {
      const items = await ContractService.getFolderChildren({ parentId: params.parentId });

      this.elements = this._sortElements(items);

      return this.elements;
    } catch (e) {
      console.error('Failed to fetch Collaborative Space elements data');
      return null;
    }
  }

  /**
   * Function returns given folder parentId needed for return button.
   * @param {Number} id of current folder
   * @returns {Number} id of parent folder
   */
  async getElementsParentId(id) {
    const parent = await ContractService.getFolder(id);
    return parent.parentFileId;
  }

  /**
   * Creates new folder or file
   * @param type String 'folder' or 'file'
   * @param data Object Data(parentId, name...)
   * @returns {Promise<void>}
   */
  async createElement(type, data) {
    const newElement = type === 'folder' ? await ContractService.createFolder(data) :
      await ContractService.createFile(data);
    this.elements = [...this.elements, newElement];
  }

  getSortedElements(order) {
    this.elements = this._sortElements(this.elements, order);
    return this.elements;
  }

  _sortElements(elements, order = 'DESC') {
    elements.sort((a, b) => {
      if (a instanceof ContractFolderModel && b instanceof ContractFileModel) {
        return -1;
      } else if (a instanceof ContractFileModel && b instanceof ContractFolderModel) {
        return 1;
      } else {
        return order === 'ASC' ?
          (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1) :
          (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
      }
    });

    return elements;
  }

  searchContract(searchPhrase) {
    if (searchPhrase) {
      return this.contracts.filter(c =>
        c.name.toLowerCase().startsWith(searchPhrase.toLowerCase()) ||
        c.number.toLowerCase().startsWith(searchPhrase.toLowerCase()));
    }

    return this.contracts;
  }
}

export default new ContractStore();
