import React, { Component } from "react";
import { translate } from "common/methods/translations";
import CollaborativeSpaceStore from "stores/CollaborativeSpaceStore";
import Select from "elements/Select/Select";

import Modal from "elements/Modal/Modal";
import styles from "./PermissionsModal.scss";
import { Input, Button, Media } from "reactstrap";
import Delete from "assets/images/myEspaceCo/delete.svg";

const permissionsTranslation = {
  r: translate("myCollaborativeSpace.modals.readOnly"),
  rw: translate("myCollaborativeSpace.modals.writeAndRead"),
  rwx: translate("myCollaborativeSpace.modals.fullControl")
};

const permissionsArray = [
  { name: translate("myCollaborativeSpace.modals.readOnly"), value: "r" },
  { name: translate("myCollaborativeSpace.modals.writeAndRead"), value: "rw" },
  { name: translate("myCollaborativeSpace.modals.fullControl"), value: "rwx" }
];

class PermissionsModal extends Component {
  state = {
    currentFile: {},
    usersPermitted: [],
    inheritance: false,
    isAddingUser: false,
    formEmail: "",
    formLevel: ""
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.file !== null) {
      this.getFileInformations(nextProps.file);
      this.setState(state => ({
        ...state,
        currentFile: nextProps.file
      }));
    }
  }

  breakInheritance = async () => {
    const { currentFile } = this.state;
    await CollaborativeSpaceStore.breakFilePermissions(currentFile.id);
    this.setState(state => ({
      ...state,
      inheritance: false
    }));
  };

  handleInputChange = key => e => {
    const val = e.target.value;
    this.setState(state => ({
      ...state,
      [key]: val
    }));
  };

  handleSelectChange = key => e => {
    this.setState(state => ({
      ...state,
      [key]: e
    }));
  };

  toggleAddingUser = bool => () => {
    this.setState(state => ({
      ...state,
      isAddingUser: bool
    }));
  };

  deleteUserPermission = user => async () => {
    const { currentFile } = this.state;
    await CollaborativeSpaceStore.deleteFilePermissions(
      currentFile.id,
      user.email
    );
    this.getFileInformations(currentFile);
  };

  getFileInformations = async file => {
    const permissions = await CollaborativeSpaceStore.getFilePermissions(
      file.id
    );
    let inheritance = false;
    let usersPermitted = [];
    permissions &&
      permissions.map(permission => {
        if (!inheritance && permission.file.permissionInheritance) {
          inheritance = true;
        }
        usersPermitted.push({
          email: permission.principalId,
          level: permission.level
        });
        return null;
      });
    this.setState(state => ({
      ...state,
      usersPermitted,
      inheritance
    }));
    return null;
  };

  addFilePermissions = async () => {
    const { currentFile, formEmail, formLevel } = this.state;
    const { toggle } = this.props;
    await CollaborativeSpaceStore.addFilePermissions(
      currentFile.id,
      formEmail,
      formLevel
    );
    this.setState(state => ({
      ...state,
      usersPermitted: [],
      inheritance: false,
      isAddingUser: false,
      formEmail: "",
      formLevel: ""
    }));
    toggle();
    return null;
  };

  buttons = () => {
    const { isAddingUser } = this.state;
    if (isAddingUser) {
      return (
        <div>
          <Button color="secondary" onClick={this.toggleAddingUser(false)}>
            {translate("globals.cancel")}
          </Button>
          <Button color="primary" onClick={this.addFilePermissions} className={styles.rightButton}>
            {translate("globals.save")}
          </Button>
        </div>
      );
    }
    return null;
  };

  render() {
    const { usersPermitted, isAddingUser, formEmail, inheritance } = this.state;
    return (
      <Modal
        {...this.props}
        className={"NewFileModal"}
        ModalFooterContent={this.buttons}
      >
        <p className={styles.Title}>
          {translate("myCollaborativeSpace.modals.permissions")}
        </p>

        <div className={styles.permissionsActions}>
          <div
            className={styles.addUserPermission}
            onClick={this.toggleAddingUser(!isAddingUser)}
          >
            <span> {isAddingUser ? "-" : "+"}</span>
          </div>
          {inheritance && (
            <div
              className={styles.breakInheritance}
              onClick={this.breakInheritance}
            >
              <span>
                {translate("myCollaborativeSpace.modals.breakInheritance")}
              </span>
            </div>
          )}
        </div>

        {isAddingUser ? (
          <div>
            <p className={styles.inputLabel}>
              {translate("myCollaborativeSpace.user")}
            </p>
            <Input
              placeholder={translate("myCollaborativeSpace.userEmail")}
              value={formEmail}
              onChange={this.handleInputChange("formEmail")}
            />
            <p className={styles.secondInputLabel}>
              {translate("myCollaborativeSpace.userPermissions")}
            </p>
            <Select
              initialOption={""}
              selectedOption={this.handleSelectChange("formLevel")}
              setOptions={permissionsArray}
              className={styles.levelSelect}
            />
          </div>
        ) : (
          usersPermitted.map(userPermission => {
            return (
              <div className={styles.userRow}>
                {userPermission.email}
                {permissionsTranslation[userPermission.level]}
                <div
                  className={styles.DeleteUserPermissions}
                  onClick={this.deleteUserPermission(userPermission)}
                >
                  <Media src={Delete} />
                </div>
              </div>
            );
          })
        )}
        {inheritance && (
          <div className={styles.hasInheritance}>
            {translate("myCollaborativeSpace.modals.hasInheritance")}
          </div>
        )}
      </Modal>
    );
  }
}

export default PermissionsModal;
