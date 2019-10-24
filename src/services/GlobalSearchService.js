import ApiMiddleware from 'services/ApiMiddleware';
import { ANCHOR } from '../common/consts/api';
import PurchaseSlipModel from "../models/PurchaseSlipModel";
import ReportModel from "../models/ReportModel";

class ContactService {
  /**
   * TODO : Expected response to have all results divided into types of modules eg. MyContractSlips, MyReportings etc.
   * Params: phrase, page and order.
   *
   * @returns Array
   */
  async getResults(params) {
    const allParams = {...{page: 1, order: 'ASC'}, ...params};
    const response = ApiMiddleware.getData(ANCHOR.GLOBAL_SEARCH, allParams);
    const results = [];
    response.map(item => {
      let newItem;
      switch (item.type) {
        case 'MyPurchaseSlips':
          if (!results.MyPurchaseSlips) {
            results.MyPurchaseSlips = [];
          }
          newItem = new PurchaseSlipModel(item.date, item.reference, item.amount, item.pdfLink);
          results.MyPurchaseSlips.push(newItem);
          break;
        case 'MyReports':
          if (!results.MyReports) {
            results.MyReports = [];
          }
          newItem = new ReportModel(item.date, item.name, item.pdfLink, item.excelLink);
          results.MyReports.push(newItem);
          break;
        default:
          break;
      }
      return null;
    });

    return results;
  }
}

export default new ContactService();
