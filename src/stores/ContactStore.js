// import ContactService from 'services/ContactService';
import { observable } from 'mobx';
import ContactModel from "../models/ContactModel";

class ContactStore {
  @observable
  contacts = [];

  // async fetchContacts() {
  //   try {
  //     const items = await ContactService.getContacts();
  //
  //     if (items.isEmpty) {
  //       return null;
  //     }
  //
  //     this.contacts.push(...items);
  //     return this.contacts;
  //   } catch (e) {
  //     console.error('Failed to fetch contacts data');
  //     return null;
  //   }
  // }

  // TODO: delete
  fetchContacts() {
    return [
      new ContactModel('Mon Commercial', 'Estelle', 'Wright', 'estelle.wright@paprec.com', '07.51.68.49.72'),
      new ContactModel('Mon Contact Agence', 'Brandon', 'Riley', 'brandon.riley@gmail.com', '07.41.52.44.72')
    ]
  }
}

export default new ContactStore();
