import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import styles from "./Home.module.scss";
import { Timeline } from "react-twitter-widgets";
import MainLayout from "components/MainLayout/MainLayout.jsx";

import CurrentUserStore from "../../stores/CurrentUserStore";
import { observer } from "mobx-react/index";
import RemovalService from "services/RemovalService";
import moment from "moment";
import { observable } from "mobx";
import CurrentCollectiviteStore from "../../stores/CurrentCollectiviteStore";
import CollectiviteContractService from "services/CollectiviteContractService";
import CollectiviteContractContactService from "services/CollectiviteContractContactService";
import CollectiviteAddressService from "services/CollectiviteAddressService";
import CollectiviteService from "services/CollectiviteService";
import CollaborativeSpaceStore from "../../stores/CollaborativeSpaceStore";
import { translate } from "common/methods/translations";

// Boxes
import GoodPractices from "./GoodPractices/GoodPractices";
import CompanyLogo from "./CompanyLogo/CompanyLogo";
import Tonnage from "./Tonnage/Tonnage";
import MyContract from "./MyContract/MyContract";
import MySalesContact from "./MySalesContact/MySalesContact";
import NewPurchaseSlips from "./NewPurchaseSlips/NewPurchaseSlips";
import ReactGA from "react-ga";

@observer
class Home extends Component {
  @observable monthlyWeight = "";
  @observable annualWeight = 0;
  @observable numberOfNewPurchaseSlips = "";
  @observable contracts = [];
  @observable contacts = [];
  @observable administrativeAddress = {};
  @observable companyAddress = {};
  @observable factoryAddress = {};
  @observable nbDoc = 0;
  @observable docData = null;

  async componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "Home"
    });

    ReactGA.event({
      category: `Global`,
      action: "Home"
    });

    this.monthlyWeight = await this.getMonthlyRemovalWeight();
    this.annualWeight = await this.getStatsPaprec();
    this.contracts = await CollectiviteContractService.getCollectiviteConctracts();
    if (this.contracts && this.contracts[0] && this.contracts[0].contratId) {
      this.contacts = await CollectiviteContractContactService.getContacts(
        this.contracts[0].contratId
      );
    }
    this.requestData();
    this.getCollectiviteAddresses();
  }

  async getStatsPaprec() {
    let results = await CollectiviteService.getStatsPaprec();
    return (Math.round(results / 1000000) / 1000).toLocaleString("fr");
  }

  async getCollectiviteAddresses() {
    const addresses = await CollectiviteAddressService.getCurrentCollectiviteAddresses();
    this.administrativeAddress =
      addresses.find(address => address.type === "SC") || {};
    this.companyAddress = addresses.find(address => address.type === "E") || {};
    //this.factoryAddress = addresses.find(address => address.type === 'E') || {};
    this.factoryAddress =
      addresses.find(address => address.type === "TP") || {};
  }

  async getMonthlyRemovalWeight() {
    const firstDay = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");
    const lastDay = moment().format("YYYY-MM-DD");
    const removals = await RemovalService.getRemovals({
      pageNumber: 1,
      pageSize: 1000,
      searchExpressions: [`Date >= "${firstDay}"`, `Date <= "${lastDay}"`]
    });
    const removalsWeight = removals.removals.map(element =>
      Number(element.weight)
    );
    return removalsWeight.length
      ? Math.floor(
          removalsWeight.reduce((sum, currentWeight) => sum + currentWeight)
        )
      : "0";
  }

  async requestData() {
    await CurrentCollectiviteStore.fetchCurrentCollectiviteInformations();
    const {
      currentCollectivite: { rootFolderId }
    } = CurrentCollectiviteStore;
    const params = { searchPhrase: null, parentId: rootFolderId };
    this.docData = await CollaborativeSpaceStore.fetchCollaborativeSpaceElements(
      params
    );
    this.getNumberOfDocuments(this.docData);
    return true;
  }

  async getNumberOfDocuments(data) {
    if (data !== undefined && data !== null && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].downloadLink !== undefined) {
          const currentDate = new Date();
          const elementDate = new Date(data[i].lastModificationDate);
          const diffTime = currentDate.getTime() - elementDate.getTime();
          if (diffTime / (1000 * 3600 * 24) <= 5) {
            this.nbDoc++;
          }
        } else {
          const dt = await CollaborativeSpaceStore.fetchCollaborativeSpaceElements(
            { documentName: null, parentId: data[i].id }
          );
          await this.getNumberOfDocuments(dt);
        }
      }
    }
  }

  render() {
    const translations = {
      month: translate("globals.month"),
      months: translate("globals.months"),
      year: translate("globals.year"),
      years: translate("globals.years")
    };
    const { currentUser } = CurrentUserStore;
    const { currentCollectivite } = CurrentCollectiviteStore;
    const contractDuration = currentCollectivite
      ? currentCollectivite.contractDuration
      : 0;
    const years = Math.floor(contractDuration / 12);
    const months = contractDuration % 12;
    const duration = `${years > 0 ? years : ""} ${
      years > 0 ? (years === 1 ? translations.year : translations.years) : ""
    } 
      ${months > 0 ? months : ""} ${
      months > 0
        ? months === 1
          ? translations.month
          : translations.months
        : ""
    }`;

    const { portalSiren } = this.props.match.params;

    return (
      <MainLayout {...this.props}>
        <Container fluid>
          <Row>
            <Col sm="12">
              <Row>
                <MyContract
                  currentCollectivite={currentCollectivite}
                  administrativeAddress={this.administrativeAddress}
                  factoryAddress={this.factoryAddress}
                  companyAddress={this.companyAddress}
                  contracts={this.contracts}
                  duration={duration}
                  portalSiren={portalSiren}
                />
                <Col sm="5">
                  <Row>
                    <Col sm="4">
                      <Row>
                        <CompanyLogo
                          currentUser={currentUser}
                          currentCollectivite={currentCollectivite}
                        />
                        <Tonnage annualWeight={this.annualWeight} />
                      </Row>
                    </Col>
                    <GoodPractices />
                  </Row>
                  <Row className={styles.contactRow}>
                    <MySalesContact contacts={this.contacts.slice(0, 1)} />
                    {/* <NewPurchaseSlips numberOfNewPurchaseSlips={this.numberOfNewPurchaseSlips}/> */}
                    <NewPurchaseSlips numberOfNewPurchaseSlips={this.nbDoc} />
                  </Row>
                </Col>
                <Col sm="3">
                  <div className={styles.DashboardBox}>
                    <h4>{translate("home.news")}</h4>
                    {/* <Tweet tweetId="1047532687328792576" options={{ theme: "light" }}/> */}
                    <Timeline
                      dataSource={{
                        sourceType: "profile",
                        screenName: "Paprec_Group"
                      }}
                      options={{
                        username: "Paprec_Group",
                        theme: "light",
                        height: "470"
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </MainLayout>
    );
  }
}

export default Home;
