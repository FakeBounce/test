import ApiMiddleware from "services/ApiMiddleware";
import { ANCHOR } from "../common/consts/api";
import ReportModel from "../models/ReportModel";
import _ from "underscore";

class ReportService {
  /**
   * TODO : Expected each report to response with date, name, pdf link/name and excel link/name.
   * Params: dateFrom , dateTo, ORDER date DESC
   *
   * ORDER date DESC can go in every single request.
   *
   * @returns Array
   */
  async getReports(params) {
    const response = await ApiMiddleware.getData(ANCHOR.REPORT, params);
    const reports = [];
    const totalItemsCount = response.totalItemsCount;

    response.forEach(item => {
      const report = new ReportModel(
        item.date,
        item.name,
        item.pdfLink,
        item.excelLink
      );
      reports.push(report);
    });

    return { items: reports, totalItemsCount };
  }

  async getReportsTest(params, contractList) {
    // const dt = {
    //   "pageNumber": 1,
    //   "pageSize": 50,
    //   "searchExpressions":[
    //     "Date > \"2017-10-10\"",
    //     "Date < \"2019-10-10\""]
    // };
    const response = await ApiMiddleware.postData(ANCHOR.REPORT, params);
    const filteredResponse = _.filter(response.body.data, function(item) {
      return contractList.indexOf(item.numeroContrat.toString()) !== -1;
    });

    for (let i = 0; i < filteredResponse.length; i++) {
      const month = filteredResponse[i].date.split("-")[1];
      const m = month[0] === "0" ? month[1] : month;
      filteredResponse[i].mois = m;
    }
    return filteredResponse;
  }
}

export default new ReportService();
