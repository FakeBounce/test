import ApiMiddleware from 'services/ApiMiddleware';
import { ANCHOR } from '../common/consts/api';

class CollectiviteContractContactService {
  async getContacts(contractId) {
    const response = await ApiMiddleware.getData(`${ANCHOR.COLLECTIVITE_CONTRACTS}/${contractId}/contacts`);
    return response.body;
  }
}

export default new CollectiviteContractContactService();
