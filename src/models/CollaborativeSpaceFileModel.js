import FileModel from "models/FileModel";

export default class CollaborativeSpaceFileModel extends FileModel {
  constructor(
    id,
    parentId,
    name,
    downloadLink,
    lastModificationDate,
    createdBy
  ) {
    super(name, downloadLink, createdBy);
    this.id = id;
    this.parentId = parentId;
    this.lastModificationDate = lastModificationDate;
  }
}
