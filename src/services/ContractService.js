import ApiMiddleware from "services/ApiMiddleware";
import { ANCHOR, API } from "../common/consts/api";
import ContractModel from "../models/ContractModel";
import ContractFileModel from "../models/ContractFileModel";
import ContractFolderModel from "../models/ContractFolderModel";

class ContractService {
  async getContracts() {
    const response = await ApiMiddleware.getData(ANCHOR.CONTRACT);
    const contracts = [];
    response.body.forEach(item => {
      // this.getContractAddress(item.contratId);
      const contract = new ContractModel(
        item.contratId,
        item.nomContrat || "",
        `${item.reference || ""}${
          item.reference ? "-" : ""
        }${item.numeroContrat || ""}`,
        item.typeContrat,
        item.libelle
      );
      contracts.push(contract);
    });
    return contracts;
  }

  async getContractAddress(contractId) {
    //
    const response = await ApiMiddleware.getData(
      `/collectivites/contrats/${contractId}`
    );
    let address = response.body;

    return address;
  }

  async getFiles(contractId) {
    const response = await ApiMiddleware.getData(
      `${ANCHOR.CONTRACT}/${contractId}/documents`
    );
    const files = [];
    if (response && response.state && Object.keys(response.body).length !== 0) {
      response.body.forEach(item => {
        files.push(item);
      });
    }
    return files;
  }

  async getFolder(id) {
    const response = await ApiMiddleware.getData(
      ANCHOR.CONTRACT_FOLDERS + `/${id}`
    );
    if (!response.body) {
      return null;
    }
    return response.body;
  }

  async createFolder(folder) {
    const data = {
      name: folder.name,
      parentFileId: folder.parentId,
      creePar: folder.creePar
    };
    const response = await ApiMiddleware.postData(
      ANCHOR.CONTRACT_FOLDERS,
      data
    );
    if (!response.body) {
      return null;
    }
    const {
      id,
      name,
      parentFileId: parentId,
      creePar: createdBy,
      dateModification: lastModificationDate
    } = response.body;
    return new ContractFolderModel(
      id,
      parentId,
      name,
      lastModificationDate,
      createdBy
    );
  }

  async createFile(file) {
    const response = await ApiMiddleware.postFile(
      `${ANCHOR.CONTRACT_FOLDERS}/${file.parentFolderId}/file`,
      file
    );
    if (!response.body) {
      return null;
    }
    const {
      id,
      name,
      parentFileId: parentId,
      creePar: createdBy,
      dateModification: lastModificationDate
    } = response.body;
    return new ContractFolderModel(
      id,
      parentId,
      name,
      lastModificationDate,
      createdBy
    );
  }

  async downloadFile(file) {
    const response = await ApiMiddleware.getFile(
      `${ANCHOR.CONTRACT_FOLDERS}/${file.parentId}/file/${file.id}`,
      null
    );
    if (!response) {
      return null;
    }
    return response;
  }

  /**
   * TODO : Expected each slip to response with file or folder data.
   * Params: name(folder or file), parentId(Id of parent folder), ORDER name(DESC or ASC), NO LIMIT
   *
   * @returns Array
   */
  async getFolderChildren(params) {
    const folderId = params.parentId;
    const response = await ApiMiddleware.getData(
      ANCHOR.CONTRACT_FOLDERS + `/${folderId}`
    );

    if (!response.body.files) {
      return [];
    }

    const elements = [];
    response.body.files.map(item => {
      let newItem;
      if (item.contentType === "system/folder") {
        newItem = new ContractFolderModel(
          item.id,
          item.parentFileId,
          item.name,
          item.dateModification || item.dateCreation,
          item.creePar
        );
      } else {
        const downloadLink = `${API.API_URL}${
          ANCHOR.CONTRACT_FOLDERS
        }/${folderId}/file/${item.id}`;
        newItem = new ContractFileModel(
          item.id,
          item.parentFileId,
          item.name,
          downloadLink,
          item.dateModification || item.dateCreation,
          item.creePar
        );
      }
      elements.push(newItem);
      return null;
    });

    return elements;
  }
}

export default new ContractService();
