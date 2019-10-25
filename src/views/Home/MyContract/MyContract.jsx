import React, { Component } from "react";
import { Col, NavLink, Button } from "reactstrap";
import styles from "./MyContract.module.scss";
import { translate } from "common/methods/translations";

import ContractService from "services/ContractService";
import CollectiviteContractService from "services/CollectiviteContractService";

class MyContract extends Component {
  state = {
    contractsAddresses: []
  };

  async componentDidMount() {
    const contractsAddresses = [];
    CollectiviteContractService.getCollectiviteConctracts().then(contracts => {
      if(contracts)
      {
        contracts.map(async contract => {
          const contratAddress = await ContractService.getContractAddress(
              contract.contratId
          );
          contractsAddresses.push(contratAddress);
        });
        this.setState(state => ({
          ...state,
          contractsAddresses
        }));
      }
    });
  }

  upperCaseFirstLetter = string => {
    return string
      ? string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
      : "";
  };

  render() {
    const {
      currentCollectivite,
      administrativeAddress,
      factoryAddress,
      companyAddress
      //duration
    } = this.props;
    const { contractsAddresses } = this.state;
    return (
      <Col sm="3">
        <div className={`${styles.DashboardBox} ${styles.Box1}`}>
          <div className={styles.TabBox}>
            <div className={styles.TransparentRow}>
              <h4>{translate("globals.menu.myContracts")}</h4>
              <NavLink href="/myContracts">
                <Button className={styles.EditButton} />
              </NavLink>
            </div>
            <div className={styles.GrayRow}>
              <span>
                {translate("myContracts.information.codeEcoOrganisme")}
              </span>
              <span>{currentCollectivite.code}</span>
            </div>
            <div className={styles.GrayRow}>
              <span>{translate("home.administrativeAddress")}</span>
              <span>
                {administrativeAddress.address_1}
                <br />
                {administrativeAddress.address_2}
                <br />
                {administrativeAddress.postalCode} {administrativeAddress.city}
                <br />
              </span>
            </div>
            <div className={styles.GrayRow}>
              <span>{translate("home.factoryAddress")}</span>
              <span>
                {factoryAddress.address_1}
                <br />
                {factoryAddress.address_2}
                <br />
                {factoryAddress.postalCode} {factoryAddress.city}
                <br />
              </span>
            </div>
            {contractsAddresses.length > 0 &&
              contractsAddresses.map(sortingAddress => {
                return (
                  <div
                    className={styles.GrayRow}
                    key={`sortingAddresses-${sortingAddress.libelle}`}
                  >
                    <span>{translate("home.sortingCenterAddress")}</span>

                    <span>
                      {this.upperCaseFirstLetter(sortingAddress.libelle)}
                      <br />
                      {this.upperCaseFirstLetter(sortingAddress.adresse)}
                      <br />
                      {sortingAddress.codePostal}{" "}
                      {this.upperCaseFirstLetter(sortingAddress.localite)}
                    </span>
                  </div>
                );
              })}
            {companyAddress && companyAddress.address_1 && (
              <div className={styles.GrayRow}>
                <span>{translate("home.companyAddress")}</span>
                <span>
                  {companyAddress.address_1}
                  <br />
                  {companyAddress.address_2}
                  <br />
                  {companyAddress.postalCode} {companyAddress.city}
                  <br />
                </span>
              </div>
            )}
          </div>
        </div>
      </Col>
    );
  }
}

export default MyContract;
