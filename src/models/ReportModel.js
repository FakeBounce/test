export default class ReportModel {
  constructor(date, name, pdfLink, excelLink, template) {
    this.date = date;
    this.name = name;
    this.pdfLink = pdfLink;
    this.excelLink = excelLink;
    this.template = template;
  }
}
