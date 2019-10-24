export const API = {
  //API_URL: 'http://10.93.254.4:10101/api'
  // API_URL: 'http://10.93.254.4:9876/collectivites/api'//Préprod
  //API_URL: 'http://localhost:9876/collectivites/api'//Dev
 // API_URL: 'http://fr-lbmvapp003:9876/collectivites/api'//Intégration
 API_URL: 'https://fr-lbmvapp003:44302/api'//Intégration
 //   API_URL: '/api'//¨PROD
 //  API_URL: 'https://mynodusrecyclage.paprec.com/api'//¨PROD
};

export const ANCHOR = {
  AUTHENTICATION: "/token/authenticate",
  REMOVAL_MONTH: "/collectivites/enlevements/periode",
  REMOVAL: "/collectivites/enlevements",
  PURCHASE_SLIP: "/collectivites/bas",
  PURCHASE_SLIP_DOCUMENT: "/collectivites/documents/download",
  REPORT: "/collectivites/odc",
  CONTACT: "",
  COLLECTIVITE: "/collectivites",
  COLLECTIVITE_ADDRESS: "/collectivites/adresses",
  COLLECTIVITE_CONTRACTS: "/collectivites/contrats",
  COLLECTIVITE_STATS: "/collectivites/stats",
  COLLABORATIVE_SPACE_FOLDERS: "/dms",
  COLLABORATIVE_SPACE_FOLDERS_EDITION: "/dms/folder",
  COLLABORATIVE_SPACE_FOLDERS_PERMISSIONS: "/dms/permissions",
  CONTRACT_FOLDERS: "/folders",
  GLOBAL_SEARCH: "",
  CONTRACT: "/collectivites/contrats",
  USER: "/utilisateurs",
  USER_BY_EMAIL: "/utilisateurs/email",
  USER_LIST: "/utilisateurs/byclientid",
  USER_PROFILE: "/utilisateurs/profils",
  ALL_PROFILES: "/utilisateurs/profils/all",
  CHANGE_PASSWORD: "/utilisateurs/password"
};

export default API;
