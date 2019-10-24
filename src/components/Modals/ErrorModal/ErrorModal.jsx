import React, {Component} from 'react';
import {Button} from 'reactstrap';

import Modal from 'elements/Modal/Modal';

class ErrorModal extends Component {

  okButtonClick() {
    const {handleOkButtonClick} = this.props;
    handleOkButtonClick();
  }

  buttons() {
    return (
      <Button color="primary" onClick={this.okButtonClick.bind(this)}>OK</Button>
    );
  }

  render() {
    return (
      <Modal
        ModalFooterContent={this.buttons.bind(this)}
        {...this.props}
        className={'InformationModal'}
      />
    );
  }
}

export default ErrorModal;