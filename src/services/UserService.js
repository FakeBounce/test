import ApiMiddleware from "services/ApiMiddleware";
import { ANCHOR } from "../common/consts/api";
import UserModel from "../models/UserModel";
import AuthService from "./AuthService";

class UserService {
  profile = AuthService.getProfile();
  userList = [];

  async getUsers() {
    this.profile = AuthService.getProfile();
    const response = await ApiMiddleware.getData(
      ANCHOR.USER_LIST + `/${this.profile.portailId}`
    );
    const users = [];
    if (response && response.state && response.body) {
      response.body.forEach(item => {
        if (item.userType === 0) {
          const {
            nom: lastName,
            prenom: firstName,
            email,
            userId,
            fonction: _function,
            mobile: phoneNumber,
            clientId,
            userType
          } = item;
          // const profile = item.userProfils.length ? item.userProfils[0].profil : {};
          // const user = new UserModel(userId, firstName, lastName, email, _function, phoneNumber, profile.profilId, clientId, profile.libelle);
          const profile = item.userProfils.length ? item.userProfils[0] : {};
          const user = new UserModel(
            userId,
            firstName,
            lastName,
            email,
            _function,
            phoneNumber,
            profile.profil.profilId,
            clientId,
            profile.profil.libelle,
            userType,
            profile.userProfilId
          );
          users.push(user);
        }
      });
    }
    this.userList = users;
    return users;
  }

  async getUserProfil() {
    const response = await ApiMiddleware.getData(ANCHOR.USER);
    let profil = {};
    if (response && response.state && response.body) {
      profil = response.body.userProfils[0].profil;
    }
    return profil;
  }

  async getUser(id) {
    const response = await ApiMiddleware.getData(ANCHOR.USER, { id });
    const {
      nom: lastName,
      prenom: firstName,
      email,
      userId,
      mobile: phoneNumber,
      clientId,
      userType
    } = response.body;
    const profile = response.body.userProfils.length
      ? response.body.userProfils[0].profil
      : {};
    return new UserModel(
      userId,
      firstName,
      lastName,
      email,
      null,
      phoneNumber,
      profile.profilId,
      clientId,
      profile.libelle,
      userType
    );
  }

  async getUserByMail(emailAdress) {
    const response = await ApiMiddleware.getData(
      ANCHOR.USER_BY_EMAIL + "/" + emailAdress
    );
    const {
      nom: lastName,
      prenom: firstName,
      email,
      userId,
      mobile: phoneNumber,
      clientId,
      userType
    } = response.body;
    const profile = response.body.userProfils.length
      ? response.body.userProfils[0].profil
      : {};
    return new UserModel(
      userId,
      firstName,
      lastName,
      email,
      null,
      phoneNumber,
      profile.profilId,
      clientId,
      profile.libelle,
      userType
    );
    //const profile = response.body.userProfils.length ? response.body.userProfils[0] : {};
    //return new UserModel(userId, firstName,lastName, email, null, phoneNumber, profile.profil.profileId, clientId, profile.profil.libelle, userType, profile.userProfilId);
  }

  async create(data) {
    const userData = {
      clientId: this.profile.portailId,
      email: data.email,
      mobile: data.phoneNumber,
      nom: data.lastName,
      prenom: data.firstName,
      fonction: data.function_
    };

    let newUser = {};
    // const request = async() => {
    //   const response = await ApiMiddleware.postData(ANCHOR.USER, userData);
    //   newUser = await this.getUserByMail(response.body.email);

    //   const users = await this.getUsers();
    //   const newUser = users.find(x => x.email === response.body.email);
    //   newUser.profileId = +data.profileId;
    //   if(newUser.id && this.userList.find(x => x.id === newUser.id) === null){
    //     this.userList.push(newUser);
    //   }
    //   return newUser;
    // }
    // request().then(() => this.updateUserProfile(newUser))

    const response = await ApiMiddleware.postData(ANCHOR.USER, userData);
    if (response.body) {
      const users = await this.getUsers();
      newUser = users.find(x => x.email === response.body.email);
      if (newUser) {
        newUser.profileId = +data.profileId;
        return await this.updateUserProfile(newUser);
      }
    }

    return newUser;
  }

  async edit(data) {
    const userData = {
      userId: data.id,
      email: data.email,
      mobile: data.phoneNumber,
      nom: data.lastName,
      prenom: data.firstName,
      fonction: data.function_,
      estActif: true
    };
    const response = await ApiMiddleware.put(ANCHOR.USER, userData);

    if (response.body) {
      const user = this.userList.find(x => x.id === data.id);
      if (user) {
        user.profileId = data.profileId;
        return await this.updateUserProfile(user);
      }
    }

    return response;
  }

  async delete(email) {
    return await ApiMiddleware.delete(ANCHOR.USER + `/${email}`, {});
  }

  async createUserProfile(profilId, userProfilId) {
    // const userData = {autorisationDemandeDevis: true, autorisationDemandeMateriel: false, estActif: true, profilId, userId};
    const userData = {
      autorisationDemandeDevis: true,
      autorisationDemandeMateriel: false,
      estActif: true,
      profilId,
      userProfilId
    };
    const response = await ApiMiddleware.postData(
      ANCHOR.USER_PROFILE,
      userData
    );

    return response;
  }

  async updateUserProfile(data) {
    //const userData = {autorisationDemandeDevis: false, autorisationDemandeMateriel: false, estActif: true, profilId: data.profilId, userId: data.userId, userProfilId: data.userProfilId};
    const userData = {
      autorisationDemandeDevis: false,
      autorisationDemandeMateriel: false,
      estActif: true,
      profilId: data.profileId,
      userId: data.id,
      userProfilId: data.userProfilId
    };
    const response = await ApiMiddleware.put(ANCHOR.USER_PROFILE, userData);
    return response;
  }

  async checkIfUserExists(email) {
    const response = await ApiMiddleware.getData(
      `${ANCHOR.USER}/email/${email}`
    );
    return response.body.userId ? true : false;
  }
}

export default new UserService();
