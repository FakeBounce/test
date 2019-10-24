// import { observable } from "mobx/lib/mobx";
import { observable } from "mobx";
import PERMISSION_MAP from "../common/consts/PermissionMap";
import CurrentUserService from "services/CurrentUserService";

class CurrentUserStore {
  @observable
  currentUser = {};

  checkUserPermission(componentPermName) {
    return this.userPermissions.indexOf(componentPermName) >= 0;
  }

  async fetchUserInformation() {
    try {
      // TODO: better way to check if user data was already fetched?
      if (this.currentUser && this.currentUser.id) {
        return this.currentUser;
      }
      this.currentUser = await CurrentUserService.getUserInfo();
    } catch (e) {
      console.error("This is my error : ", e);
      console.error("Failed to fetch user data");
      return null;
    }
  }

  /**
   *  TODO:
   *  Mapping response data in french to our permission array.
   *
   * @param userPermissions
   */
  createUserPermissionArray(userPermissions) {
    userPermissions.forEach(permission => {
      if (permission.state === 1) {
        this.currentUser.userPermissions.concat(
          PERMISSION_MAP[permission.name]
        );
      }
    });
  }
}

export default new CurrentUserStore();
