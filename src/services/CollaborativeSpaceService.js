import ApiMiddleware from "services/ApiMiddleware";
import { ANCHOR, API } from "../common/consts/api";
import CollaborativeSpaceFolderModel from "../models/CollaborativeSpaceFolderModel";
import CollaborativeSpaceFileModel from "../models/CollaborativeSpaceFileModel";

class CollaborativeSpaceService {
  /**
   * TODO : Expected each slip to response with file or folder data.
   * Params: name(folder or file), parentId(Id of parent folder), ORDER name(DESC or ASC), NO LIMIT
   *
   * @returns Array
   */
  async searchFolderChildren(parentId, searchValue) {
    const response = await ApiMiddleware.getData(
      ANCHOR.COLLABORATIVE_SPACE_FOLDERS + `/${parentId}/search/${searchValue}`
    );

    if (!response.body.files && response.body && response.body.length === 0) {
      return [];
    }

    const responseContent = response.body.files
      ? response.body.files
      : response.body;

    const elements = [];
    responseContent.map(item => {
      let newItem;
      if (item.contentType === "system/folder") {
        newItem = new CollaborativeSpaceFolderModel(
          item.id,
          item.parentFileId,
          item.name,
          item.dateModification || item.dateCreation,
          item.creePar
        );
      } else {
        const downloadLink = `${API.API_URL}${
          ANCHOR.COLLABORATIVE_SPACE_FOLDERS
        }/${parentId}/file/${item.id}`;
        newItem = new CollaborativeSpaceFileModel(
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

  /**
   * TODO : Expected each slip to response with file or folder data.
   * Params: name(folder or file), parentId(Id of parent folder), ORDER name(DESC or ASC), NO LIMIT
   *
   * @returns Array
   */
  async getFolderChildren(params) {
    const folderId = params.parentId;
    const response = await ApiMiddleware.getData(
      ANCHOR.COLLABORATIVE_SPACE_FOLDERS + `/${folderId}`
    );

    if (!response.body || !response.body.files) {
      return [];
    }

    const responseContent = response.body.files
      ? response.body.files
      : response.body;

    const elements = [];
    responseContent.map(item => {
      let newItem;
      if (item.contentType === "system/folder") {
        newItem = new CollaborativeSpaceFolderModel(
          item.id,
          item.parentFileId,
          item.name,
          item.dateModification || item.dateCreation,
          item.creePar
        );
      } else {
        const downloadLink = `${API.API_URL}${
          ANCHOR.COLLABORATIVE_SPACE_FOLDERS
        }/${folderId}/file/${item.id}`;
        newItem = new CollaborativeSpaceFileModel(
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

  async getFolder(id) {
    const response = await ApiMiddleware.getData(
      ANCHOR.COLLABORATIVE_SPACE_FOLDERS + `/${id}`
    );
    if (!response.body) {
      return null;
    }
    return response.body;
  }

  async getFilePermissions(id) {
    const response = await ApiMiddleware.getData(
      ANCHOR.COLLABORATIVE_SPACE_FOLDERS_PERMISSIONS + `/${id}`
    );
    if (!response.body) {
      return null;
    }
    return response.body;
  }

  async breakFileInheritance(id) {
    const response = await ApiMiddleware.getData(
      ANCHOR.COLLABORATIVE_SPACE_FOLDERS_PERMISSIONS + `/${id}/break`
    );
    if (!response.body) {
      return null;
    }
    return response.body;
  }

  async deleteFilePermissions(id, email) {
    const response = await ApiMiddleware.delete(
      ANCHOR.COLLABORATIVE_SPACE_FOLDERS + `/${id}/permissions/${email}`
    );
    if (!response.body) {
      return null;
    }
    return response.body;
  }

  async addFilePermissions(id, email, permissions) {
    const response = await ApiMiddleware.postData(
      ANCHOR.COLLABORATIVE_SPACE_FOLDERS_PERMISSIONS,
      {
        itemId: id,
        PrincipalId: email,
        level: permissions
      }
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
      ContentType: "system/folder",
      PermissionInheritance: 1,
      creePar: folder.creePar
    };

    const response = await ApiMiddleware.postData(
      ANCHOR.COLLABORATIVE_SPACE_FOLDERS_EDITION,
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
    return new CollaborativeSpaceFolderModel(
      id,
      parentId,
      name,
      lastModificationDate,
      createdBy
    );
  }

  async createFile(file) {
    const response = await ApiMiddleware.postFile(
      `${ANCHOR.COLLABORATIVE_SPACE_FOLDERS}/${file.parentFolderId}/file/true`,
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
    return new CollaborativeSpaceFolderModel(
      id,
      parentId,
      name,
      lastModificationDate,
      createdBy
    );
  }

  async deleteFile(fileId) {
    const response = await ApiMiddleware.delete(
      `${ANCHOR.COLLABORATIVE_SPACE_FOLDERS}/${fileId}`
    );
    if (!response.body) {
      return null;
    }
  }

  async renameFolder(fileInfos) {
    const response = await ApiMiddleware.put(
      `${ANCHOR.COLLABORATIVE_SPACE_FOLDERS}/${fileInfos.id}`,
      { name: fileInfos.name }
    );
    if (!response.body) {
      return null;
    }
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
}

export default new CollaborativeSpaceService();
