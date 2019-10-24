export default class UserModel {
  constructor(id, firstName, lastName, email, function_, phoneNumber, profileId, clientId, profileName, userType, userProfilId) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.function_ = function_;
    this.phoneNumber = phoneNumber;
    this.profileId = profileId;
    this.profile = profileName;
    this.clientId = clientId;
    this.userType = userType; 
    this.userProfilId = userProfilId;
  }
}
