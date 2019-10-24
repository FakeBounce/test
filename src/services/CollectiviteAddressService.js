import ApiMiddleware from "services/ApiMiddleware";
import { ANCHOR } from "../common/consts/api";
import AddressModel from "../models/AddressModel";

class CollectiviteAddressService {
  async getCurrentCollectiviteAddresses() {
    const response = await ApiMiddleware.getData(ANCHOR.COLLECTIVITE_ADDRESS);
    const addresses = [];
    response.body.forEach(address => {
      const {
        id,
        typeAdresseCode: type,
        adresse1: address_1,
        adresse2: address_2,
        codePostal: postalCode,
        localite: city
      } = address;
      addresses.push(
        new AddressModel(id, type, address_1, address_2, postalCode, city)
      );
    });
    return addresses;
  }

  async updateCollectiviteAddresses(addresses) {
    const responses = [];
    for (const address of addresses) {
      const {
        id,
        typeAdresseCode,
        address_1: adresse1,
        address_2: adresse2,
        postalCode: codePostal,
        city: localite
      } = address;
      const updatedData = {
        latitude: 0,
        longitude: 0,
        pays: "FRANCE",
        id,
        adresse1,
        adresse2,
        codePostal,
        localite,
        typeAdresseCode
      };
      let response;
      if (!updatedData.id) {
        delete updatedData.id;
        response = await ApiMiddleware.postData(
          ANCHOR.COLLECTIVITE_ADDRESS,
          updatedData
        );
      } else {
        response = await ApiMiddleware.put(
          ANCHOR.COLLECTIVITE_ADDRESS,
          updatedData
        );
      }
      responses.push(response);
    }
    return responses;
  }
}

export default new CollectiviteAddressService();
