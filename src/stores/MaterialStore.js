// import MaterialService from 'services/MaterialService';
import { observable } from 'mobx';
import MaterialModel from "../models/MaterialModel";

class MaterialStore {
  @observable
  materialData = [];

  // TODO: delete
  fakeMaterialData = [
    new MaterialModel(1, 'La Bourget', 3, 2, 3, 4),
    new MaterialModel(2, 'La Courneuve', 1, 2, 3, 41),
    new MaterialModel(3, 'Aubervilliers', 3, 1, 32, 4)
  ];

  // async fetchMaterialData() {
  //   try {
  //     const items = await MaterialService.getMaterialData();
  //
  //     if (items.isEmpty) {
  //       return null;
  //     }
  //
  //     this.materialData.push(...items);
  //     return this.materialData;
  //   } catch (e) {
  //     console.error('Failed to fetch material data');
  //     return null;
  //   }
  // }

  // TODO: delete
  fetchMaterialData() {
    return this.fakeMaterialData;
  }
}

export default new MaterialStore();
