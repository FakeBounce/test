import FolderModel from "models/FolderModel";

export default class CollaborativeSpaceFolderModel extends FolderModel {
  constructor(id, parentId, name, lastModificationDate, createdBy) {
    super(id, parentId, name, createdBy);
    this.lastModificationDate = lastModificationDate;
  }
}
