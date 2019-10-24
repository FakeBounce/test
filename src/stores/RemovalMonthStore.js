import RemovalMonthService from 'services/RemovalMonthService';
import { observable } from 'mobx';

class RemovalMonthStore {
  @observable
  months = [];

  async fetchMonths(year) {
    this.months = []; 
    try {
      const items = await RemovalMonthService.getMonths(year);

      if (items.isEmpty) {
        return null;
      }

      this.months.push(...items);
      return this.months;
    } catch (e) {
      console.error('Failed to fetch removal months data');
      return null;
    }
  }
}

export default new RemovalMonthStore();
