import ApiMiddleware from 'services/ApiMiddleware';
import { ANCHOR } from '../common/consts/api';
import PurchaseSlipModel from '../models/PurchaseSlipModel';
import ApiService from "./ApiService";

class PurchaseSlipService {
  /**
   * Params: dateFrom , dateTo, reference(number), pageNumber, order DESC or ASC
   *
   * @returns {Object} Records and page data
   */
  async getPurchaseSlips(params) {
    const response = await ApiMiddleware.postData(ANCHOR.PURCHASE_SLIP, params);

    const data = {totalItemsCount: 0, pageNumber: 1, items: []};

    // if (!response.body && !response.body.data) {
    //   return data;
    // }
    if (!response.body.data) {
      return data;
    }
  
    response.body.data.map(item => {
      const {reference, date, montant: amount, link: pdfLink} = item;
      const slip = new PurchaseSlipModel(date, reference, amount, pdfLink);
      data.items.push(slip);
      return null;
    });
    const pageData = response.body.page;
    data.totalItemsCount = pageData.totalElements;
    data.pageNumber = pageData.pageNumber;

    return data;
  }

  async getPurchaseSlipsDocument(data) {
    const {date, pdfLink, amount, reference } = data;
    const body = [{ date, link: pdfLink, montant: amount, reference }];
    return await ApiService.getPDF(ANCHOR.PURCHASE_SLIP_DOCUMENT, body);
  }
}

export default new PurchaseSlipService();
