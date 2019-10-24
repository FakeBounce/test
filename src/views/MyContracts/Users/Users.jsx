import React, { Component } from "react";
import styles from "./Users.module.scss";
import { Media, ListGroup } from "reactstrap";
import UserContainer from "./UserContainer/UserContainer";
import UserStore from "stores/UserStore";
import SearchBox from "components/SearchBox/SearchBox";
import TopButtons from "./TopButtons/TopButtons";
import ActiveUser from "./ActiveUser/ActiveUser";
import { observer } from "mobx-react";
import { observable } from "mobx";

import { translate } from "common/methods/translations";
import Tick from "assets/images/green_tick.png";
import Error from "assets/images/error.png";
import InformationModal from "components/Modals/InformationModal/InformationModal";
import ConfirmModal from "components/Modals/ConfirmModal/ConfirmModal";
import FormModal from "components/Modals/FormModal/FormModal";
import Loader from "components/Loader/Loader.jsx";
import UserService from "services/UserService";
import ErrorModal from "components/Modals/ErrorModal/ErrorModal";
import UserProfileService from "services/UserProfileService";
import ReactGA from "react-ga";

@observer
class Users extends Component {
  static tabName = "Users";
  @observable searchValue = "";
  @observable userData = observable([]);
  @observable activeUser = observable({});
  @observable confirmModalOpen = false;
  @observable informationModalOpen = false;
  @observable errorModalOpen = false;
  @observable error = observable({ message: "", title: "" });
  @observable formModalOpen = false;
  @observable confirmModalContent = observable({
    title: "",
    body: "",
    theme: ""
  });
  @observable userIDtoDelete = null;
  @observable ascSort = false;
  @observable loading = false;
  @observable profiles = observable([]);

  constructor() {
    super();

    this.state = {
      userData: []
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.searchBoxValue = this.searchBoxValue.bind(this);
    this.requestSearch = this.requestSearch.bind(this);
    this.addNewUserButton = this.addNewUserButton.bind(this);
    this.deleteUserByIdButton = this.deleteUserByIdButton.bind(this);
    this.editUser = this.editUser.bind(this);
    this.switchSort = this.switchSort.bind(this);
    this.checkResponse = this.checkResponse.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
  }

  async componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "Contracts/Users"
    });

    ReactGA.event({
      category: `Global`,
      action: "Contracts/Users"
    });

    await this.fetchUsers();
    this.profiles = await UserProfileService.getProfiles();
  }

  async fetchUsers() {
    const result = await UserStore.fetchUsers(null);
    this.setState(state => ({
      ...state,
      userData: result
    }));
  }

  async reloadUsers() {
    const result = await UserService.getUsers();
    this.setState(state => ({
      ...state,
      userData: result
    }));
  }

  searchBoxValue(value) {
    this.searchValue = value;
  }

  requestSearch() {
    const result = UserStore.searchUsers(
      this.searchValue,
      this.ascSort ? "ASC" : "DESC"
    );
    this.setState(state => ({
      ...state,
      userData: result
    }));
  }

  informationOkButtonClick() {
    this.informationModalOpen = false;
  }

  errorOkButtonClick() {
    this.errorModalOpen = false;
  }

  async formModalSaveButtonClick(newUserModel) {
    const { collectiviteInfo } = this.props;
    const checkIfEmailExists = await UserService.checkIfUserExists(
      newUserModel.email
    );
    if (checkIfEmailExists) {
      this.error.message = translate(
        "myContracts.users.emailAlreadyExistsSubtitle"
      );
      this.error.title = translate("myContracts.users.emailAlreadyExistsTitle");
      this.errorModalOpen = true;
    } else {
      const response = await UserService.create(newUserModel);
      this.formModalOpen = false;
      this.clickChild();

      ReactGA.event({
        category: `${collectiviteInfo}`,
        action: "User creation"
      });
      if (this.checkResponse(response)) {
        this.informationModalOpen = true;
      }
      await this.reloadUsers();
    }
  }

  addNewUserButton() {
    this.formModalOpen = true;
  }

  deleteUserByIdButton(id) {
    this.userIDtoDelete = id;
    this.confirmModalOpen = true;
    this.confirmModalContent.title = translate(
      "myContracts.users.deleteTitle"
    ).toUpperCase();
    this.confirmModalContent.body = translate(
      "myContracts.users.deleteSubtitle"
    );
    this.confirmModalContent.theme = "red";
  }

  async confirmModalYesButtonClick() {
    if (this.userIDtoDelete) {
      const user = UserStore.getUserById(this.userIDtoDelete);
      const response = await UserService.delete(user.email);
      this.userIDtoDelete = null;
      this.checkResponse(response);
      await this.fetchUsers();
    }
    this.confirmModalOpen = false;
    this.formModalOpen = false;
    this.clickChild();
  }

  confirmModalNoButtonClick() {
    this.confirmModalOpen = false;
    this.userIDtoDelete = null;
  }

  async editUser(user) {
    await UserService.edit(user);
    await this.fetchUsers();
  }

  confirmExitAddNewUserModal() {
    this.confirmModalContent.title = translate(
      "myContracts.users.userCreateUndoTitle"
    ).toUpperCase();
    this.confirmModalContent.body = translate(
      "myContracts.users.userCreateUndoSubtitle"
    );
    this.confirmModalContent.theme = "blue";
    this.confirmModalOpen = true;
  }

  async switchSort() {
    this.ascSort = !this.ascSort;
    await this.requestSearch();
  }

  checkResponse(response) {
    if (!response || !response.state) {
      this.error.message = translate("globals.generalError");
      this.error.title = "";
      this.errorModalOpen = true;
      return false;
    }
    return true;
  }

  setActiveUser(user) {
    this.activeUser = user;
  }

  render() {
    const { userData } = this.state;
    return (
      <div className={styles.Users}>
        <div className={styles.Sidebar}>
          <div className={styles.TopBar}>
            <SearchBox
              searchedValue={this.searchBoxValue}
              placeholder={translate("myContracts.users.searchPlaceholder")}
              requestSearch={this.requestSearch}
              className={styles.SearchBox}
            />
            <TopButtons
              className={styles.TopButtons}
              addNewUserButton={this.addNewUserButton}
            />
          </div>
          <div className={styles.Separator}>
            <span> {translate("myContracts.users.all")} </span>
            <div className={styles.HorizontalLine} />
          </div>
          <div className={styles.UsersList}>
            <div className={styles.SortContainer}>
              <span>
                {userData.length} {translate("myContracts.users.users")}
              </span>
              <div
                onClick={this.switchSort}
                className={styles.SortButtonWrapper}
              >
                <span className={styles.ClickTextCursor}>
                  {translate("globals.sortBy")}
                  {` ${this.ascSort ? "Z - A" : "A - Z"}`}
                </span>
                {this.ascSort ? (
                  <span className={`${styles.Arrow} ${styles.ArrowUp}`} />
                ) : (
                  <span className={`${styles.Arrow} ${styles.ArrowDown}`} />
                )}
              </div>
            </div>
            <Loader show={this.loading} />
            <ListGroup
              className={`${styles.ListGroup} ${
                this.formModalOpen ? styles.Opacity : ""
              }`}
            >
              {userData.map(user => {
                return (
                  <UserContainer
                    key={user.id}
                    activeUserId={this.activeUser.id}
                    user={user}
                    deleteUserbyId={this.deleteUserByIdButton}
                    editUser={this.editUser}
                    setActiveUser={this.setActiveUser}
                  />
                );
              })}
            </ListGroup>
          </div>
        </div>
        <div className={styles.ActiveUser}>
          {this.activeUser.id && (
            <ActiveUser
              user={this.activeUser}
              editUser={this.editUser}
              availableProfiles={this.profiles}
            />
          )}
        </div>
        <InformationModal
          isOpen={this.informationModalOpen}
          title={""}
          handleOkButtonClick={this.informationOkButtonClick.bind(this)}
          toggle={() => (this.informationModalOpen = false)}
        >
          <div>
            <Media src={Tick} />
            <p>{translate("myContracts.users.userCreated")}</p>
          </div>
        </InformationModal>

        <ErrorModal
          isOpen={this.errorModalOpen}
          title={this.error.title}
          handleOkButtonClick={this.errorOkButtonClick.bind(this)}
          toggle={() => (this.errorModalOpen = false)}
        >
          <div>
            <Media src={Error} />
            <p>{this.error.message}</p>
          </div>
        </ErrorModal>

        <ConfirmModal
          isOpen={this.confirmModalOpen}
          title={this.confirmModalContent.title}
          theme={this.confirmModalContent.theme}
          handleYesButtonClick={this.confirmModalYesButtonClick.bind(this)}
          handleNoButtonClick={this.confirmModalNoButtonClick.bind(this)}
          toggle={() => (this.confirmModalOpen = false)}
        >
          <div>{this.confirmModalContent.body}</div>
        </ConfirmModal>

        <FormModal
          setClick={click => (this.clickChild = click)}
          isOpen={this.formModalOpen}
          title={translate("myContracts.users.newUser").toUpperCase()}
          availableProfiles={this.profiles}
          handleSaveButtonClick={this.formModalSaveButtonClick.bind(this)}
          toggle={this.confirmExitAddNewUserModal.bind(this)}
        />
      </div>
    );
  }
}

export default Users;
