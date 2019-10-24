import CollectiviteAddressService from "services/CollectiviteAddressService";

class CollectiviteAddressStore {
  addresses = [];

  async fetchCollectivityAddresses(params) {
    try {
      this.addresses =  await CollectiviteAddressService.getCurrentCollectiviteAddresses();
    } catch (e) {
      console.error('Failed to fetch addresses data');
      return null;
    }
  }
}

export default new CollectiviteAddressStore();
