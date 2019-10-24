// import { observable } from "mobx/lib/mobx";
import { observable } from "mobx";
import CollectiviteService from "services/CollectiviteService";

class CurrentCollectiviteStore {
  @observable
  currentCollectivite = {};

  async fetchCurrentCollectiviteInformations() {
    try {
      // if (this.currentCollectivite.id) {
      //   return this.currentCollectivite;
      // }
      this.currentCollectivite = await CollectiviteService.getCurrentCollectivite();
    } catch (e) {
      console.error('Failed to fetch collectivite data', e);
      return null;
    }
  }
}

export default new CurrentCollectiviteStore();
