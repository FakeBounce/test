import ApiMiddleware from "services/ApiMiddleware";
import { ANCHOR } from "../common/consts/api";

class CollectiviteContractService {
  async getCollectiviteConctracts() {
    const response = await ApiMiddleware.getData(ANCHOR.COLLECTIVITE_CONTRACTS);
    if (response && response.body) {
      return response.body;
    }
    return null;
  }
}

export default new CollectiviteContractService();
