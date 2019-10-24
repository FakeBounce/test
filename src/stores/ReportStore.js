import ReportService from "services/ReportService";
import ReportModel from "../models/ReportModel";

class ReportStore {
  // TODO: delete
  reports = this.createReports();

  createReports() {
    let files = [];
    for (let i = 0; i < 45; i++) {
      const report = new ReportModel(
        new Date(new Date().getTime() + -20 * 24 * 60 * 60 * 1000),
        `File - ${i}`,
        "/pdfFile.pdf",
        "/pdfFile.pdf",
        i < 20 ? "X" : "Y"
      );
      files.push(report);
    }
    return files;
  }

  fetchReports(params) {
    const allParams = { ...{ page: 1 }, ...params };
    const pageStart = (allParams.page - 1) * 10;

    let files = this.reports;
    if (allParams.template) {
      files = files.filter(element => element.template === allParams.template);
    }

    if (allParams.dateFrom) {
      const dateFrom = allParams.dateFrom
        .split("/")
        .reverse()
        .join("/");
      files = files.filter(
        element =>
          element.date
            .toJSON()
            .substr(0, 10)
            .split("-")
            .reverse()
            .join("/") >= dateFrom
      );
    }

    if (allParams.dateTo) {
      const dateTo = allParams.dateTo
        .split("/")
        .reverse()
        .join("/");
      files = files.filter(
        element =>
          element.date
            .toJSON()
            .substr(0, 10)
            .split("-")
            .reverse()
            .join("/") <= dateTo
      );
    }

    return {
      items: files.slice(pageStart, pageStart + 10),
      totalItemsCount: files.length
    };
  }

  async fetchDataReports(params, contractList) {
    const data = await ReportService.getReportsTest(params, contractList);
    return data;
  }

  // async fetchReports(params) {
  //   try {
  //     const data = await ReportService.getReports(params);

  //     if (data.items.isEmpty) {
  //       return null;
  //     }

  //     this.reports.push(...data.items);
  //     this.totalItemsCount = data.totalItemsCount;

  //     return { items: this.reports, totalItemsCount: this.totalItemsCount };
  //   } catch (e) {
  //     console.error('Failed to fetch reports data');
  //     return null;
  //   }
  // }
}

export default new ReportStore();
