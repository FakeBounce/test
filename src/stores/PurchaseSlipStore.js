import PurchaseSlipService from 'services/PurchaseSlipService';

class PurchaseSlipStore {
  purchaseSlips = [];

  async fetchPurchaseSlips(params) {
    try {
      const data = await PurchaseSlipService.getPurchaseSlips(params);
      this.purchaseSlips = data.items;
      return data;
    } catch (e) {
      console.error('Failed to fetch purchase slips data');
      return null;
    }
  }
}

export default new PurchaseSlipStore();
