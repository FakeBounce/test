import React, { Component } from "react";
import styles from "./Informations.module.scss";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { translate } from "common/methods/translations";

import { Row, Col } from "reactstrap";
import Input from "elements/Input/Input";
import CurrentCollectiviteStore from "stores/CurrentCollectiviteStore";
import CollectiviteAddressStore from "stores/CollectiviteAddressStore";
import CollectiviteAddressService from "services/CollectiviteAddressService";
import CollectiviteService from "services/CollectiviteService";
import AddressModel from "models/AddressModel";
import ReactGA from "react-ga";

@observer
class Informations extends Component {
  static tabName = "Information";
  @observable edit_mode_1 = false;
  @observable edit_mode_2 = false;
  @observable edit_mode_3 = false;
  @observable organization = {
    collectivityName: "",
    ecoOrganismeCode: "",
    contractDuration: ""
  };
  @observable addresses = {
    headquartersAddress: {},
    buildingAddress: {},
    publicTreasureAddress: {}
  };

  constructor() {
    super();
    this.changeMode1 = this.changeMode1.bind(this);
    this.changeMode2 = this.changeMode2.bind(this);
    this.changeMode3 = this.changeMode3.bind(this);
    this.saveMode1 = this.saveMode1.bind(this);
    this.saveMode2 = this.saveMode2.bind(this);
    this.saveMode3 = this.saveMode3.bind(this);
    this.setCollectivityName = this.setCollectivityName.bind(this);
    this.setEcoOrganismeCode = this.setEcoOrganismeCode.bind(this);
    this.setContractDuration = this.setContractDuration.bind(this);

    // this.setHeadquartersAddress1 = this.setHeadquartersAddress1.bind(this);
    // this.setHeadquartersAddress2 = this.setHeadquartersAddress2.bind(this);
    // this.setHeadquartersPostalCode = this.setHeadquartersPostalCode.bind(this);
    // this.setHeadquartersCity = this.setHeadquartersCity.bind(this);
    this.setBuildingAddress1 = this.setBuildingAddress1.bind(this);
    this.setBuildingAddress2 = this.setBuildingAddress2.bind(this);
    this.setBuildingPostalCode = this.setBuildingPostalCode.bind(this);
    this.setBuildingCity = this.setBuildingCity.bind(this);
    this.setPublicTreasureAddress1 = this.setPublicTreasureAddress1.bind(this);
    this.setPublicTreasureAddress2 = this.setPublicTreasureAddress2.bind(this);
    this.setPublicTreasurePostalCode = this.setPublicTreasurePostalCode.bind(
      this
    );
    this.setPublicTreasureCity = this.setPublicTreasureCity.bind(this);
  }

  async componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "Contracts/Informations"
    });

    ReactGA.event({
      category: `Global`,
      action: "Contracts/Informations"
    });

    await CurrentCollectiviteStore.fetchCurrentCollectiviteInformations();
    this.setInitalCollectivityValues();
    await CollectiviteAddressStore.fetchCollectivityAddresses();
    this.getCollectivityAddresses();
  }

  getCollectivityAddresses() {
    const { addresses } = CollectiviteAddressStore;
    // const headquartersAddress = addresses.find(address => address.type === 'SC') || new AddressModel();
    const buildingAddress =
      addresses.find(address => address.type === "SC") || new AddressModel();
    const publicTreasureAddress =
      addresses.find(address => address.type === "TP") || new AddressModel();
    // this.addresses.headquartersAddress = Object.assign(new AddressModel(), headquartersAddress);
    this.addresses.buildingAddress = Object.assign(
      new AddressModel(),
      buildingAddress
    );
    this.addresses.publicTreasureAddress = Object.assign(
      new AddressModel(),
      publicTreasureAddress
    );
  }

  setInitalCollectivityValues() {
    const { currentCollectivite } = CurrentCollectiviteStore;
    const { id, code, name, contractDuration } = currentCollectivite;
    this.organization.id = id;
    this.organization.ecoOrganismeCode = code;
    this.organization.collectivityName = name;
    this.organization.contractDuration = contractDuration;
  }

  setCollectivityName(collectivityName) {
    this.organization.collectivityName = collectivityName;
  }

  setEcoOrganismeCode(ecoOrganismeCode) {
    this.organization.ecoOrganismeCode = ecoOrganismeCode;
  }

  setContractDuration(duration) {
    this.organization.contractDuration = duration;
  }

  // setHeadquartersAddress1(headquartersAddress1) {
  //   this.addresses.headquartersAddress.address_1 = headquartersAddress1;
  // }

  // setHeadquartersAddress2(headquartersAddress2) {
  //   this.addresses.headquartersAddress.address_2 = headquartersAddress2;
  // }

  // setHeadquartersPostalCode(code) {
  //   this.addresses.headquartersAddress.postalCode = code;
  // }

  // setHeadquartersCity(city) {
  //   this.addresses.headquartersAddress.city = city;
  // }

  setBuildingAddress1(buildingAddress1) {
    this.addresses.buildingAddress.address_1 = buildingAddress1;
  }

  setBuildingAddress2(buildingAddress2) {
    this.addresses.buildingAddress.address_2 = buildingAddress2;
  }

  setBuildingPostalCode(code) {
    this.addresses.buildingAddress.postalCode = code;
  }

  setBuildingCity(city) {
    this.addresses.buildingAddress.city = city;
  }

  setPublicTreasureAddress1(publicTreasureAddress1) {
    this.addresses.publicTreasureAddress.address_1 = publicTreasureAddress1;
  }

  setPublicTreasureAddress2(publicTreasureAddress2) {
    this.addresses.publicTreasureAddress.address_2 = publicTreasureAddress2;
  }

  setPublicTreasurePostalCode(code) {
    this.addresses.publicTreasureAddress.postalCode = code;
  }

  setPublicTreasureCity(city) {
    this.addresses.publicTreasureAddress.city = city;
  }

  changeMode1() {
    this.edit_mode_1 = !this.edit_mode_1;
    if (!this.edit_mode_1) {
      this.setInitalCollectivityValues();
    }
  }

  changeMode2() {
    this.edit_mode_2 = !this.edit_mode_2;
    if (!this.edit_mode_2) {
      this.getCollectivityAddresses();
    }
  }

  changeMode3() {
    this.edit_mode_3 = !this.edit_mode_3;
    if (!this.edit_mode_3) {
      //this.getCollectivityContacts();
    }
  }

  async saveMode1() {
    this.edit_mode_1 = !this.edit_mode_1;
    await CollectiviteService.updateCurrentCollectivite(this.organization);
  }

  async saveMode2() {
    this.edit_mode_2 = !this.edit_mode_2;
    this.addresses.buildingAddress.typeAdresseCode = "SC";
    this.addresses.publicTreasureAddress.typeAdresseCode = "TP";
    await CollectiviteAddressService.updateCollectiviteAddresses([
      this.addresses.buildingAddress,
      this.addresses.publicTreasureAddress
    ]);
  }

  async saveMode3() {
    this.edit_mode_3 = !this.edit_mode_3;
    // const responses = await CollectiviteAddressService
    //   .updateCollectiviteAddresses(
    //     [this.addresses.buildingAddress, this.addresses.headquartersAddress, this.addresses.publicTreasureAddress]
    //   );
  }

  render() {
    // const translations = {
    //   month: translate('globals.month'),
    //   months: translate('globals.months'),
    //   year: translate('globals.year'),
    //   years: translate('globals.years'),
    // }
    // const years = Math.floor(this.organization.contractDuration / 12);
    // const months = this.organization.contractDuration % 12;
    // const duration = `${years > 0 ? years : ''} ${years > 0 ?
    //   (years === 1 ? translations.year : translations.years) : ''}
    //   ${months > 0 ? months : ''} ${months > 0 ? (months === 1 ? translations.month : translations.months) : ''}`;
    return (
      <div className={styles.Informations}>
        <Row>
          <Col sm="12">
            <div className={styles.TabBox}>
              <div className={styles.TopBar}>
                <h4 className={styles.WithBorder}>
                  {translate("myContracts.information.organization")}
                </h4>
                {this.edit_mode_1 ? (
                  <div>
                    <button
                      onClick={this.saveMode1}
                      className={styles.TextButton}
                    >
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
                <Col sm="4">
                  <div className={styles.DataColumn}>
                    <h4>
                      {translate("myContracts.information.collectivityName")}
                    </h4>
                    <p>{this.organization.collectivityName}</p>
                  </div>
                </Col>
                <Col sm="4">
                  <div className={styles.DataColumn}>
                    <h4>
                      {translate("myContracts.information.codeEcoOrganisme")}
                    </h4>
                    {this.edit_mode_1 ? (
                      <Input
                        inputValue={this.setEcoOrganismeCode}
                        initialValue={this.organization.ecoOrganismeCode}
                      />
                    ) : (
                      <p>{this.organization.ecoOrganismeCode}</p>
                    )}
                  </div>
                </Col>
                <Col sm="4">
                  {/* <div className={styles.DataColumn}>
                    <h4>{translate('myContracts.information.contractDuration')}</h4>
                    <p>{duration}</p>
                  </div> */}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <div className={styles.TabBox}>
              <div className={styles.TopBar}>
                <h4 className={styles.WithBorder}>
                  {translate("myContracts.information.addresses")}
                </h4>
                {this.edit_mode_2 ? (
                  <div>
                    <button
                      onClick={this.saveMode2}
                      className={styles.TextButton}
                    >
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
                <Col sm="4">
                  <div className={styles.DataColumn}>
                    <h4>
                      {translate("myContracts.information.headquartersAddress")}
                    </h4>
                    {this.edit_mode_2 ? (
                      <Input
                        inputValue={this.setBuildingAddress1}
                        initialValue={this.addresses.buildingAddress.address_1}
                      />
                    ) : (
                      <p>{this.addresses.buildingAddress.address_1}</p>
                    )}
                    {this.edit_mode_2 ? (
                      <Input
                        inputValue={this.setBuildingAddress2}
                        initialValue={this.addresses.buildingAddress.address_2}
                      />
                    ) : (
                      <p>{this.addresses.buildingAddress.address_2}</p>
                    )}
                    {this.edit_mode_2 ? (
                      <Input
                        inputValue={this.setBuildingPostalCode}
                        initialValue={this.addresses.buildingAddress.postalCode}
                      />
                    ) : (
                      <p>
                        {this.addresses.buildingAddress.postalCode}{" "}
                        {this.addresses.buildingAddress.city}
                      </p>
                    )}
                    {this.edit_mode_2 ? (
                      <Input
                        inputValue={this.setBuildingCity}
                        initialValue={this.addresses.buildingAddress.city}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
                {/* <Col sm="4">
                  <div className={styles.DataColumn}>
                    <h4>{translate('myContracts.information.buildingAddress')}</h4>
                    {this.edit_mode_2 ?
                      <Input
                        inputValue={this.setBuildingAddress1}
                        initialValue={this.addresses.buildingAddress.address_1}
                      /> :
                      <p>{this.addresses.buildingAddress.address_1}</p>}
                    {this.edit_mode_2 ?
                      <Input
                        inputValue={this.setBuildingAddress2}
                        initialValue={this.addresses.buildingAddress.address_2}
                      /> :
                      <p>{this.addresses.buildingAddress.address_2}</p>}
                    {this.edit_mode_2 ?
                      <Input
                        inputValue={this.setBuildingPostalCode}
                        initialValue={this.addresses.buildingAddress.postalCode}
                      /> :
                      <p>{this.addresses.buildingAddress.postalCode} {this.addresses.buildingAddress.city}</p>}
                    {this.edit_mode_2 ?
                      <Input
                        inputValue={this.setBuildingCity}
                        initialValue={this.addresses.buildingAddress.city}
                      /> :
                      ''}
                  </div>
                </Col> */}
                <Col sm="4">
                  <div className={styles.DataColumn}>
                    <h4>
                      {translate("myContracts.information.publicTreasure")}
                    </h4>
                    {this.edit_mode_2 ? (
                      <Input
                        inputValue={this.setPublicTreasureAddress1}
                        initialValue={
                          this.addresses.publicTreasureAddress.address_1
                        }
                      />
                    ) : (
                      <p>{this.addresses.publicTreasureAddress.address_1}</p>
                    )}
                    {this.edit_mode_2 ? (
                      <Input
                        inputValue={this.setPublicTreasureAddress2}
                        initialValue={
                          this.addresses.publicTreasureAddress.address_2
                        }
                      />
                    ) : (
                      <p>{this.addresses.publicTreasureAddress.address_2}</p>
                    )}
                    {this.edit_mode_2 ? (
                      <Input
                        inputValue={this.setPublicTreasurePostalCode}
                        initialValue={
                          this.addresses.publicTreasureAddress.postalCode
                        }
                      />
                    ) : (
                      <p>
                        {this.addresses.publicTreasureAddress.postalCode}{" "}
                        {this.addresses.publicTreasureAddress.city}
                      </p>
                    )}
                    {this.edit_mode_2 ? (
                      <Input
                        inputValue={this.setPublicTreasureCity}
                        initialValue={this.addresses.publicTreasureAddress.city}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* <Row>
          <Col sm="12">
            <div className={styles.TabBox}>
              <div className={styles.TopBar}>
                <h4 >{translate('myContracts.information.contacts')}</h4>
                  {this.edit_mode_3 ?
                  <div>
                  <button onClick={this.changeMode3} className={styles.TextButton}>{translate('globals.save')}</button>
                  <button onClick={this.changeMode3} className={styles.TextButton}>{translate('globals.cancel')}</button>
                  </div> :
                  <button onClick={this.changeMode3} className={styles.EditButton}/>}  
              </div>
              <Row>
                <Col sm="4">
                  <div className={styles.DataColumn}>
                    <p>M.Paul Durand</p>
                    <p>p.durand@test.com</p>
                    <p>01.02.03.04.05</p>
                  </div>
                </Col>
                <Col sm="4">
                  <div className={styles.DataColumn}>
                    <p>Mme.Karine Chesne</p>
                    <p>k.chesne@test.com</p>
                    <p>06.01.04.08.70</p>
                  </div>
                </Col>
                <Col sm="4">
                  <div className={styles.DataColumn}>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default Informations;
