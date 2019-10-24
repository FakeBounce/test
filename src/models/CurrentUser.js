export default class CurrentUserModel {
  constructor(id, firstName,lastName, email, function_, phoneNumber, profile, clientId, clientLogo, clientName, permissions, userType) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.function_ = function_;
    this.phoneNumber = phoneNumber;
    this.profile = profile;
    this.clientId = clientId;
    this.permissions = permissions;
    this.clientLogo = clientLogo;
    this.clientName = clientName;
    this.userType = userType; 
  }
}
