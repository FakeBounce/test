export default class RemovalMonthModel {
  constructor(month, year, weight) {
    this.month = month;
    this.year = year;
    this.weight = Math.round(weight);
  }
}
