import React, { Component } from "react";
import styles from "./ActiveUser.module.scss";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Col } from "reactstrap";
import Select from "elements/Select/Select";
import Input from "elements/Input/Input";
import { translate } from "common/methods/translations";



@observer
class ActiveUser extends Component {
  @observable edit_mode = false;
  @observable user = observable({});
  @observable error = false;
  @observable errors = { profileId: false, phoneNumber: false };
  userInitialState = {};

  constructor() {
    super();
    this.changeMode = this.changeMode.bind(this);
    this.changePhoneNumber = this.changePhoneNumber.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.setUserInitialState = this.setUserInitialState.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    this.user = user;
    this.userInitialState = Object.assign({}, user);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.user = this.props.user;
      this.edit_mode = false;
      this.userInitialState = Object.assign({}, this.props.user);
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.user.id !== nextProps.user.id) {
      this.setUserInitialState();
    }
  }

  changeMode() {
    if (this.edit_mode) {
      this.setUserInitialState();
    }
    this.edit_mode = !this.edit_mode;
  }

  changeProfile(value) {
    const { availableProfiles } = this.props;
    this.user.profileId = +value;
    this.user.profile = availableProfiles.find(x => x.value === +value) ? availableProfiles.find(x => x.value === +value).name: null;
  }

  changePhoneNumber(value) {
    this.user.phoneNumber = value;
  }

  handleEditUser() {
    const { editUser } = this.props;
    const required = ['profileId', 'phoneNumber'];
    this.error = false;
    console.log(this.error);
    required.forEach((field) => {
      console.log(this.user[field]);
      if (!this.user[field]) {
        this.errors[field] = true;
        this.error = true;
      } else {
        this.errors[field] = false;
      }
    });
    if (!this.error) {
      editUser(this.user);
      this.userInitialState = Object.assign({}, this.user);
      this.changeMode();
    }
  }

  setUserInitialState() {
    this.user.phoneNumber = this.userInitialState.phoneNumber;
    this.user.profileId = this.userInitialState.profileId;
  }

  render() {
    const {
      user: { firstName, lastName, email, function_, phoneNumber, profile }
    } = this;

    const { availableProfiles } = this.props;

    return (
      <div className={styles.ActiveUserBox}>
        <div className={styles.Heading}>
          <div className={styles.UserInitials}>
            <span>
              {firstName ? firstName.charAt(0) : ""}
              {lastName ? lastName.charAt(0) : ""}
            </span>
          </div>
          <div className={styles.UserDetails}>
            <h4 className={styles.UserName}>
              {firstName} {lastName}
            </h4>
            <p className={styles.UserDetailsParagraph}>{email}</p>
            <p className={styles.UserDetailsParagraph}>{function_}</p>
          </div>
        </div>
        <div className={styles.UserDataBox}>
          <Col sm="12">
            <div className={styles.UserDataHeading}>
              <p className={styles.InformationsParagraph}>
                {translate("myContracts.users.personalInfo")}
              </p>

              {this.edit_mode ? (
                <React.Fragment>
                  <button
                    onClick={() => this.handleEditUser(this.user)}
                    className={styles.UserEditButton}
                  >
                    {translate("globals.save").toUpperCase()}
                  </button>
                  <button
                    onClick={this.changeMode}
                    className={`${styles.UserEditButton} ${
                      styles.UserCancelButton
                      }`}
                  >
                    {translate("globals.cancel").toUpperCase()}
                  </button>
                </React.Fragment>
              ) : (
                <span onClick={this.changeMode} className={styles.EditButton}/>
              )}
            </div>
          </Col>
          <div className={styles.UserDataInfo}>
            <Col sm="6">
              <div className={styles.InfoBox}>
                <p className={styles.UserDetailsParagraph}>
                  {translate("myProfile.personalInformation.phoneNumber")}
                </p>
                {this.edit_mode ? (
                  <div>
                    <Input
                      inputValue={this.changePhoneNumber}
                      placeholder={"Phone number"}
                      initialValue={this.user.phoneNumber}
                      className={styles.UserEditInput}
                    />
                    <p className={styles.ErrorBox} hidden={!this.errors.phoneNumber}>{translate('globals.required')}</p>
                  </div>
                ) : (
                  <p>{phoneNumber}</p>
                )}
              </div>
            </Col>
            <Col sm="6">
              <div className={styles.InfoBox}>
                <p className={styles.UserDetailsParagraph}>
                  {translate("myProfile.personalInformation.profile")}
                </p>
                {this.edit_mode ? (
                  <div>
                    <Select
                      initialOption={this.user.profileId || ''}
                      selectedOption={this.changeProfile}
                      setOptions={availableProfiles}
                      className={styles.UserEditInput}
                    />
                    <p className={styles.ErrorBox} hidden={!this.errors.profileId}>{translate('globals.required')}</p>
                  </div>
                ) : (
                  <p>{profile}</p>
                )}
              </div>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveUser;
