export default class FolderModel {
  constructor(id, parentId, name, createdBy) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.createdBy = createdBy;
  }
}
