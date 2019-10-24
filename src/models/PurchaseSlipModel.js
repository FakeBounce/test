export default class PurchaseSlipModel {
  constructor(date, reference, amount, pdfLink) {
    this.date = date;
    this.reference = reference;
    this.amount = amount;
    this.pdfLink = pdfLink;
  }
}
