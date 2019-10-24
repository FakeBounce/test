import ApiMiddleware from 'services/ApiMiddleware';
import { ANCHOR } from '../common/consts/api';

class ContractFileService {
  async getFiles(contractId) {
    const response = await ApiMiddleware.getData(`${ANCHOR.CONTRACT}/${contractId}/documents`);
    const files = [];
    if (response && response.state && Object.keys(response.body).length !== 0) {
      response.body.forEach(item => {
        files.push(item);
      });
    }
    return files;
  }
}

export default new ContractFileService();
