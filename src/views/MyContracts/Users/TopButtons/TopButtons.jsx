import React, {Component} from 'react';
import styles from './TopButtons.module.scss';
import {Button} from 'reactstrap';

class TopButtons extends Component {

  handleAddUserClick() {
    const {addNewUserButton} = this.props;
    addNewUserButton();
  }

  render() {
    return (
      <div className={styles.ButtonsBox}>
        <Button className={styles.AddUser} color="secondary" size="lg" onClick={this.handleAddUserClick.bind(this)}/>
      </div>
    );
  }
}

export default TopButtons;