import React, { Component } from "react";
import styles from "./Alerts.module.scss";
import { Row, Col, Label } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";

import ConfirmModal from "components/Modals/ConfirmModal/ConfirmModal";
import SelectModal from "components/Modals/SelectModal/SelectModal";
import { translate } from "common/methods/translations";

import ReactGA from "react-ga";

@observer
class Alarms extends Component {
  static tabName = "alerts";
  @observable edit_mode_1 = false;
  @observable edit_mode_2 = false;
  @observable confirmModalOpen = false;
  @observable selectModalOpen = false;
  @observable confirmModalContent = observable({
    title: "",
    body: "",
    theme: ""
  });
  @observable alerts = {
    newOrder: {
      enabled: false,
      allContracts: false,
      contracts: [1, 2, 3]
    },
    orderFollowUp: {
      enabled: false,
      allContracts: false,
      contracts: [1, 2, 3]
    },
    disputedOrder: {
      enabled: false,
      allContracts: false,
      contracts: []
    }
  };

  constructor() {
    super();
    this.changeMode1 = this.changeMode1.bind(this);
    this.changeMode2 = this.changeMode2.bind(this);
    this.enableAlert = this.enableAlert.bind(this);
    this.dropdownChange = this.dropdownChange.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "MyProfile/Alarms"
    });

    ReactGA.event({
      category: `Global`,
      action: "MyProfile/Alarms"
    });
  }

  changeMode1() {
    this.edit_mode_1 = !this.edit_mode_1;
  }

  changeMode2() {
    this.edit_mode_2 = !this.edit_mode_2;
  }

  enableAlert(event, type) {
    const state = event.target.checked;
    this.alerts[type].enabled = state;
    this.alerts[type].allContracts = false;
    if (!state) {
      this.alerts[type].contracts = [];
    }
  }

  dropdownChange(type, state) {
    // this.alerts[type].allContracts = state;
    // if (state) {
    //   this.alerts[type].contracts = [];
    // }
  }

  confirmExit() {
    this.confirmModalContent.title = translate(
      "myProfile.alerts.updateCancelTitle"
    ).toUpperCase();
    this.confirmModalContent.body = translate(
      "myProfile.alerts.updateCancelSubtitle"
    );
    this.confirmModalContent.theme = "blue";
    this.confirmModalOpen = true;
  }

  confirmModalYesButtonClick() {
    this.confirmModalOpen = false;
    this.selectModalOpen = false;
  }

  confirmModalNoButtonClick() {
    this.confirmModalOpen = false;
  }

  selectModalSaveButtonClick(newUserModel) {}

  openModal() {
    this.selectModalOpen = true;
  }

  render() {
    // const allContracts = translate('myProfile.alerts.allContracts');
    // const personalize = translate('myProfile.alerts.personalize');
    // const select = translate('myProfile.alerts.select');
    // const contracts = translate('myContracts.submenu.contracts');
    // const newOrder = this.alerts.newOrder;
    // const orderFollowUp = this.alerts.orderFollowUp;
    // const disputedOrder = this.alerts.disputedOrder;
    return (
      <div className={styles.PersonalInformations}>
        <Row>
          <Col sm="12">
            <div className={styles.TabBox}>
              <div className={styles.TopBar}>
                <h4>Orders</h4>
                {this.edit_mode_1 ? (
                  <div>
                    <button className={styles.TextButton}>
                      {translate("globals.save")}
                    </button>
                    <button
                      onClick={this.changeMode1}
                      className={styles.TextButton}
                    >
                      {translate("globals.cancel")}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={this.changeMode1}
                    className={styles.EditButton}
                  />
                )}
              </div>

              <Row>
                <Col sm="12">
                  <div className={styles.DataColumn}>
                    <Row>
                      <Col sm="6">
                        <p>{translate("myProfile.alerts.newOrder")}</p>
                      </Col>
                      <Col sm="6">
                        <Label className={styles.Switch}>
                          <input
                            type="checkbox"
                            onClick={e => this.enableAlert(e, "newOrder")}
                          />{" "}
                          <span className={styles.Slider} />
                        </Label>
                      </Col>
                      {/*<Col sm="4">*/}
                      {/*<div hidden={!newOrder.enabled}>*/}
                      {/*<DropDown selectedState={newOrder.allContracts ? allContracts : personalize} type="newOrder"*/}
                      {/*dropdownChange={this.dropdownChange}/>*/}
                      {/*<span hidden={newOrder.allContracts}>*/}
                      {/*{`  |  ${newOrder.contracts.length} ${contracts} `}*/}
                      {/*<span className={styles.Select} onClick={this.openModal}>{select}</span>*/}
                      {/*</span>*/}
                      {/*</div>*/}
                      {/*</Col>*/}
                    </Row>
                    <Row>
                      <Col sm="6">
                        <p>{translate("myProfile.alerts.orderFollowUp")}</p>
                      </Col>
                      <Col sm="6">
                        <Label className={styles.Switch}>
                          <input
                            type="checkbox"
                            onClick={e => this.enableAlert(e, "orderFollowUp")}
                          />{" "}
                          <span className={styles.Slider} />
                        </Label>
                        {/*<div hidden={!orderFollowUp.enabled}>*/}
                        {/*<span>*/}
                        {/*{orderFollowUp.allContracts ? allContracts : personalize}*/}
                        {/*</span>*/}
                        {/*<span hidden={orderFollowUp.allContracts}>*/}
                        {/*{` | ${orderFollowUp.contracts.length} ${contracts} `}*/}
                        {/*<span>{select}</span>*/}
                        {/*</span>*/}
                        {/*</div>*/}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <p>Dispute of orders</p>
                      </Col>
                      <Col sm="6">
                        <Label className={styles.Switch}>
                          <input
                            type="checkbox"
                            onClick={e => this.enableAlert(e, "disputedOrder")}
                          />{" "}
                          <span className={styles.Slider} />
                        </Label>
                        {/*<span hidden={!disputedOrder.enabled} className={styles.ClickTextCursor}>*/}
                        {/*{disputedOrder.allContracts ? allContracts : personalize}*/}
                        {/*</span>*/}
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <div className={styles.TabBox}>
              <div className={styles.TopBar}>
                <h4>Collaborative space</h4>
                {this.edit_mode_2 ? (
                  <div>
                    <button className={styles.TextButton}>
                      {translate("globals.save")}
                    </button>
                    <button
                      onClick={this.changeMode2}
                      className={styles.TextButton}
                    >
                      {translate("globals.cancel")}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={this.changeMode2}
                    className={styles.EditButton}
                  />
                )}
              </div>
              <Row>
                <Col sm="12">
                  <div className={styles.DataColumn}>
                    <Row>
                      <Col sm="6">
                        <p>New folder / new document</p>
                      </Col>
                      <Col sm="6">
                        <Label className={styles.Switch}>
                          <input type="checkbox" />{" "}
                          <span className={styles.Slider} />
                        </Label>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <SelectModal
          isOpen={this.selectModalOpen}
          selectedAlert={this.currentType}
          handleSaveButtonClick={this.selectModalSaveButtonClick.bind(this)}
          toggle={this.confirmExit.bind(this)}
        />
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
      </div>
    );
  }
}

export default Alarms;
