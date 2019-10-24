export default class CollectiviteModel {
  constructor(id, code, name, rootFolderId, contratsRootFolderId, contractDuration, logo, dateModification) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.rootFolderId = rootFolderId;
    this.contratsRootFolderId = contratsRootFolderId;
    this.contractDuration = contractDuration;
    this.logo = logo;
    this.dateModification = dateModification;
  }
}
