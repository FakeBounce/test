/**
 * Model representing contract in My Contracts Tab.
 * TODO: type(to represent picture type of picture used next to contract)?????
 * TODO: place(place/address under cotract's name) ??????
 * TODO: number(number under picture on the left) ????
 * Contract can have multiple files attached.
 */
export default class ContractModel {
  constructor(id, name, number, type, place, numberOfMaterials) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.type = type;
    this.place = place;
    this.numberOfMaterials = numberOfMaterials;
  }
}
