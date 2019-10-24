export default class AddressModel {
  constructor(id = null, type = '', address_1 = '', address_2 = '', postalCode = '', city = '') {
    this.id = id;
    this.type = type;
    this.address_1 = address_1;
    this.address_2 = address_2;
    this.postalCode = postalCode;
    this.city = city;
  }
}
