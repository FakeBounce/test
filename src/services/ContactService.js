import ApiMiddleware from 'services/ApiMiddleware';
import { ANCHOR } from '../common/consts/api';
import ContactModel from '../models/ContactModel';

class ContactService {
  /**
   * TODO : Expected each contact to response with type, firstName, lastName, email and number.
   * Params: no params
   *
   * @returns Array
   */
  async getContacts() {
    const response = ApiMiddleware.getData(ANCHOR.CONTACT);
    const contacts = [];
    response.map(item => {
      const contact = new ContactModel(item.type, item.firstName, item.lastName, item.email, item.number);
      contacts.push(contact);
      return null;
    });
    return contacts;
  }
}

export default new ContactService();
