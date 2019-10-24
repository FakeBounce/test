// import GlobalSearchService from 'services/GlobalSearchService';
import { observable } from 'mobx';
import PurchaseSlipModel from "../models/PurchaseSlipModel";
import FileModel from "../models/FileModel";
import ContractModel from "../models/ContractModel";
import CollaborativeSpaceFolderModel from '../models/CollaborativeSpaceFolderModel';
// import CollaborativeSpaceFileModel from '../models/CollaborativeSpaceFileModel';

class GlobalSearchStore {
  @observable
  results = [];
  page = 1;
  totalNumberOfRecords = 0;

  // async fetchResults(params) {
  //   try {
  //     const items = await GlobalSearchService.getPurchaseSlips(params);
  //
  //     if (items.isEmpty) {
  //       return null;
  //     }
  //
  //     this.results.push(...items);
  //     return this.results;
  //   } catch (e) {
  //     console.error('Failed to fetch purchase slips data');
  //     return null;
  //   }
  // }

  // TODO: delete
  fetchResults(params) {
    const files = [
      new FileModel('Report X1234', 'https://www.paprec.com/fr'),
      new FileModel('Purchases from 2018', 'https://www.paprec.com/fr'),
      new FileModel('2019 - Future Investments', 'https://www.paprec.com/fr')
    ];

    let data = {
      MyPurchaseSlips: [
        new PurchaseSlipModel(new Date('2017-10-10'), 'A123F', 122, 'hello.pdf'),
        new PurchaseSlipModel(new Date('2017-10-13'), 'Z123F', 142, 'hello.pdf'),
        new PurchaseSlipModel(new Date('2017-10-23'), 'B123F', 142, 'hello.pdf'),
        new PurchaseSlipModel(new Date('2017-11-13'), 'ZA123', 122, 'hello.pdf')
      ],
      MyContracts: [
        new ContractModel('Contract XYZ', 'AF-41241', 'X', '088 Valentina Turnpike Suite 279', 302, files),
        new ContractModel('Contract 123', 'BG-213123', 'X', '088 Valentina Turnpike Suite 279', 2, files),
        new ContractModel('Contract 098', 'CD-asdaads', 'Y', '088 Valentina Turnpike Suite 279', 32, files)
      ],
      MyCollaborativeSpace: [
        new CollaborativeSpaceFolderModel('6b94b007-5dbf-422d-bf52-1f71010118eb', 'root', 'Folder AXY')
      ]
    }

    const allParams = { ...{ order: 'DESC' }, ...params };

    if (allParams.phrase) {
      Object.keys(data).forEach((module) => {
        data[module] = data[module].filter((item) => {
          return (item.name && item.name.toLowerCase().startsWith(allParams.phrase.toLowerCase())) ||
          (item.reference && item.reference.toLowerCase().startsWith(allParams.phrase.toLowerCase()));
        });
      });
    }
    Object.keys(data).forEach((module) => {
      switch (allParams.order) {
        case 'DESC':
          data[module].sort((a, b) => {
            return b.name > a.name || b.reference > a.reference;
          });
          break;
        default:
          data[module].sort((a, b) => {
            return b.name < a.name || b.reference < a.reference;
          });
          break;
      }
    });
    return data;
  }
}

export default new GlobalSearchStore();
