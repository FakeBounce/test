import { ANCHOR } from '../common/consts/api';
import ApiMiddleware from "./ApiMiddleware";
import CurrentUserModel from "../models/CurrentUser";

class CurrentUserService {
  async getUserInfo() {
    const response = await ApiMiddleware.getData(ANCHOR.USER);
    if (response && response.state) {
      //const { nom: lastName, prenom: firstName, email, userId, mobile: phoneNumber, clientId, client, fonction: function_ } = response.body;
      const { nom: lastName, prenom: firstName, email, userId, mobile: phoneNumber, fonction: function_, userType } = response.body;
      //const { logo: clientLogo, mnemonique: clientName } = client;
      const profile = response.body.userProfils[0] ? response.body.userProfils[0].profil.libelle : '';

      //return new CurrentUserModel(userId, firstName, lastName, email, function_, phoneNumber, profile, clientId, clientLogo, clientName);
      return new CurrentUserModel(userId, firstName, lastName, email, function_, phoneNumber, profile, null, null, '', '', userType );
    } else {
      //window.location.href = '/errorPage';
    }
  }

  async changePassword(userId, data) {
    const response = await ApiMiddleware.postData(`${ANCHOR.CHANGE_PASSWORD}/${userId}`, data);
    if (response && response.state) {
      return { status: true };
    } else {
      if (response.status === 403) {
        return { status: false, message: response.message };
      }
    }
  }
}

export default new CurrentUserService();
