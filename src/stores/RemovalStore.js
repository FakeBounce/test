import RemovalService from 'services/RemovalService';

class RemovalStore {
  removals = [];
  page = {};

  async fetchRemovals(params) {
    try {
      const response = await RemovalService.getRemovals(params);

      this.removals = response.removals;
      this.page = response.page;
      return { removals: this.removals, page: this.page };
    } catch (e) {
      console.error('Failed to fetch removals data');
      return null;
    }
  }
}

export default new RemovalStore();
