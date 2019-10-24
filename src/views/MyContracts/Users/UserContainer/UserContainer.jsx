import React, { Component } from "react";
import styles from "./UserContainer.module.scss";
import { ListGroupItem } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
class UserContainer extends Component {
  @observable edit_mode = false;
  @observable user = observable({});

  componentDidMount() {
    const { user } = this.props;
    this.user = user;
  }

  render() {
    const { setActiveUser, activeUserId } = this.props;
    return (
      <ListGroupItem className={`${styles.TabBox} ${activeUserId === this.user.id ? styles.Active : ''}`} onClick={() => setActiveUser(this.user)}>
        <div className={styles.Header}>
          <span>
            {this.user.firstName ? this.user.firstName.charAt(0) : ""}
            {this.user.lastName ? this.user.lastName.charAt(0) : ""}
          </span>
        </div>
        <div className={styles.UserInfo}>
          <h4>
            {this.user.firstName} {this.user.lastName}
          </h4>
          <p className={styles.UserFunction}>{this.user.function_ || ""}</p>
          <p>{this.user.profile || ""}</p>
        </div>
      </ListGroupItem>
    );
  }
}

export default UserContainer;
