import React, { Component } from "react";
import styles from "./MyContracts.module.scss";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { translate } from "common/methods/translations";

import Header from "elements/Header";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.jsx";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import MainLayout from "components/MainLayout/MainLayout.jsx";
import { withRouter } from "react-router-dom";

import Informations from "./Informations/Informations.jsx";
// import Contracts from "./Contracts/Contracts.jsx";
import Materials from "./Materials/Materials.jsx";
import Users from "./Users/Users.jsx";
import Contacts from "./Contacts/Contacts";
import ContractService from "services/ContractService";
import ContractStore from "../../stores/ContractStore";
import CollectiviteContractService from "services/CollectiviteContractService";
import CollectiviteContractContactService from "services/CollectiviteContractContactService";
import { ClientContext } from "common/consts/ClientContext";

const availableNavs = [Informations, Materials, Users, Contacts];

@withRouter
@observer
class MyContracts extends Component {
  @observable activeTab = ``;
  @observable contracts = [];
  @observable contractContacts = [];
  @observable contractAddresses = [];

  constructor() {
    super();
    this.setTab = this.setTab.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.state = {};
  }

  async componentDidMount() {
    await CollectiviteContractService.getCollectiviteConctracts().then(
      async result => {
        if (result.length > 0) {
          result.map(async contract => {
            const contratAddress = await ContractService.getContractAddress(
              contract.agenceId
            );
            this.contractAddresses.push(contratAddress);
          });
        }
      }
    );
    this.contracts = await ContractStore.fetchContracts().then(async result => {
      if (result[0]) {
        this.contractContacts = await CollectiviteContractContactService.getContacts(
          result[0].id
        ).then(contractContacts => {
          this.setState({
            contractsResolve: result,
            contractContactsResolve: contractContacts[0]
          });
        });
      }
    });

    const { tabName } = this.props.match.params;

    const availableNavsStrings = availableNavs.map(nav => {
      return nav.tabName.toLowerCase();
    });

    if (!tabName || !availableNavsStrings.includes(tabName.toLowerCase())) {
      this.setUrl(availableNavs[0].tabName);
      this.setTab(`${availableNavs[0].tabName.toLowerCase()}`);
    } else {
      this.setUrl(tabName);
      this.setTab(`${tabName.toLowerCase()}`);
    }
  }

  setUrl(string) {
    const { history } = this.props;
    history.push(`/myContracts/${string.toLowerCase()}`);
  }

  setTab(tab) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
    }
  }

  render() {
    const breadcrumbElements = [
      { name: "home", href: "/home" },
      { name: "myContracts", isActive: true }
    ];

    return (
      <MainLayout {...this.props}>
        <Breadcrumbs elements={breadcrumbElements} />
        <Header>{translate("globals.menu.myContracts")}</Header>
        <div className={styles.MyContractsList}>
          <Nav tabs>
            {availableNavs.map((nav, index) => {
              return (
                <NavItem key={index}>
                  <NavLink
                    className={
                      this.activeTab === `${nav.tabName.toLowerCase()}`
                        ? "active"
                        : null
                    }
                    onClick={() => {
                      this.setTab(`${nav.tabName.toLowerCase()}`);
                      this.setUrl(nav.tabName);
                    }}
                  >
                    {translate(
                      `myContracts.submenu.${nav.tabName.toLowerCase()}`
                    ).toUpperCase()}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent activeTab={this.activeTab}>
            {availableNavs.map((Nav, index) => {
              if (!this.state.contractsResolve) return null;
              return (
                <TabPane tabId={`${Nav.tabName.toLowerCase()}`} key={index}>
                  <ClientContext.Consumer>
                    {({ collectiviteInfo }) => (
                      <Nav
                        collectiviteInfo={collectiviteInfo}
                        contracts={this.state.contractsResolve}
                        contractContacts={this.state.contractContactsResolve}
                        contractAddresses={this.contractAddresses}
                      />
                    )}
                  </ClientContext.Consumer>
                </TabPane>
              );
            })}
          </TabContent>
        </div>
      </MainLayout>
    );
  }
}

export default MyContracts;
