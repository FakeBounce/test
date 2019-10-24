import CollaborativeSpaceService from "services/CollaborativeSpaceService";
import CollaborativeSpaceFileModel from "../models/CollaborativeSpaceFileModel";
import CollaborativeSpaceFolderModel from "../models/CollaborativeSpaceFolderModel";

class CollaborativeSpaceStore {
  elements = [];

  async getFilePermissions(fileId) {
    try {
      const filePermissions = await CollaborativeSpaceService.getFilePermissions(
        fileId
      );

      return filePermissions;
    } catch (e) {
      console.error("Failed to fetch Collaborative Space file permissions");
      return null;
    }
  }

  async breakFilePermissions(fileId) {
    try {
      const filePermissions = await CollaborativeSpaceService.breakFileInheritance(
        fileId
      );

      return filePermissions;
    } catch (e) {
      console.error("Failed to break Collaborative Space file inheritance");
      return null;
    }
  }

  async deleteFilePermissions(fileId, email) {
    try {
      const filePermissions = await CollaborativeSpaceService.deleteFilePermissions(
        fileId,
        email
      );

      return filePermissions;
    } catch (e) {
      console.error("Failed to delete Collaborative Space file permissions");
      return null;
    }
  }

  async addFilePermissions(fileId, email, permissions) {
    try {
      const filePermissions = await CollaborativeSpaceService.addFilePermissions(
        fileId,
        email,
        permissions
      );

      return filePermissions;
    } catch (e) {
      console.error("Failed to add Collaborative Space file permissions");
      return null;
    }
  }

  /**
   * Fetch all files and folders listed in given folder
   * @param {Object} parentFolderId, order = 'DESC'
   * @returns {Promise<*>} Elements
   */
  async fetchCollaborativeSpaceElements(params) {
    try {
      const items = await CollaborativeSpaceService.getFolderChildren({
        parentId: params.parentId
      });

      this.elements = this._sortElements(items);

      return this.elements;
    } catch (e) {
      console.error("Failed to fetch Collaborative Space elements data");
      return null;
    }
  }

  /**
   * Fetch all files and folders corresponding to the search param
   * @param {Object} parentFolderId, order = 'DESC'
   * @returns {Promise<*>} Elements
   */
  async fetchCollaborativeSpaceSearchElements(parentId, searchValue) {
    try {
      let items;
      if (!searchValue || searchValue === "") {
        items = await this.fetchCollaborativeSpaceElements({ parentId });
      } else {
        items = await CollaborativeSpaceService.searchFolderChildren(
          parentId,
          searchValue
        );
      }

      this.elements = this._sortElements(items);

      return this.elements;
    } catch (e) {
      console.error("Failed to fetch Collaborative Space elements data");
      return null;
    }
  }

  /**
   * Function returns given folder parentId needed for return button.
   * @param {Number} id of current folder
   * @returns {Number} id of parent folder
   */
  async getElementsParentId(id) {
    const parent = await CollaborativeSpaceService.getFolder(id);
    return parent.parentFileId;
  }

  /**
   * Creates new folder or file
   * @param type String 'folder' or 'file'
   * @param data Object Data(parentId, name...)
   * @returns {Promise<void>}
   */
  async createElement(type, data) {
    const newElement =
      type === "folder"
        ? await CollaborativeSpaceService.createFolder(data)
        : await CollaborativeSpaceService.createFile(data);
    this.elements = [...this.elements, newElement];
  }

  async deleteElement(element, index) {
    const newElementsArray = [...this.elements];
    newElementsArray.splice(index, 1);
    await CollaborativeSpaceService.deleteFile(element.id);
    this.elements = [...newElementsArray];

    return this.elements;
  }

  getSortedElements(order) {
    this.elements = this._sortElements(this.elements, order);
    return this.elements;
  }

  _sortElements(elements, order = "DESC") {
    elements.sort((a, b) => {
      if (
        a instanceof CollaborativeSpaceFolderModel &&
        b instanceof CollaborativeSpaceFileModel
      ) {
        return -1;
      } else if (
        a instanceof CollaborativeSpaceFileModel &&
        b instanceof CollaborativeSpaceFolderModel
      ) {
        return 1;
      } else {
        return order === "ASC"
          ? a.name.toLowerCase() < b.name.toLowerCase()
            ? 1
            : -1
          : a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : 1;
      }
    });

    return elements;
  }
}

export default new CollaborativeSpaceStore();
