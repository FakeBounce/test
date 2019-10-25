import ApiMiddleware from 'services/ApiMiddleware';
import { ANCHOR } from '../common/consts/api';
import RemovalModel from '../models/RemovalModel';

class RemovalService {
  /**
   * TODO: Expected each removal to response with date, location, type, weight.
   * Params: month, ORDER date DESC, LIMIT 10, PAGE
   *
   * @param params object
   * @returns Array
   */
  async getRemovals(params) {
    const response = await ApiMiddleware.postData(ANCHOR.REMOVAL, params);
    const removals = [];
    let page = null;
    if(response && response.body)
    {
      page = response.body.page;
      response.body.data.forEach(item => {
        const removal = new RemovalModel(item.date, item.lieu, item.qualite, item.poids);
        removals.push(removal);
      });
    }
    return {removals, page};
  }
}

export default new RemovalService();
