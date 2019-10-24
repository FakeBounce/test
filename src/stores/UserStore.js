import UserService from "services/UserService";

class UserStore {
  users = [];

  async fetchUsers() {
    try {
      const data = await UserService.getUsers();

      this.users = data;
      return this.searchUsers(null);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  searchUsers(searchPhrase, order = "DESC") {
    let users = this.users;
    switch (order) {
      case "DESC":
        users.sort((a, b) =>
          a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1
        );
        break;
      default:
        users.sort((a, b) =>
          a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1
        );
    }

    if (searchPhrase) {
      users = users.filter(
        user =>
          user.firstName.toLowerCase().startsWith(searchPhrase.toLowerCase()) ||
          user.lastName.toLowerCase().startsWith(searchPhrase.toLowerCase())
      );
    }

    return users;
  }

  getUserById(id) {
    return this.users.find(user => user.id === id);
  }
}

export default new UserStore();
