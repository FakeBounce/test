import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
//import ContactContainer from "./ContactContainer/ContactContainer.jsx";
//import ContactStore from "stores/ContactStore";
import styles from "./Contacts.module.scss";
import ApiMiddleware from "services/ApiMiddleware";
import ReactGA from "react-ga";

class Contacts extends Component {
  static tabName = "Contacts";

  state = {
    entities: []
  };

  componentDidMount() {
    const { collectiviteInfo, contracts } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "Contracts/Contacts"
    });

    ReactGA.event({
      category: `Global`,
      action: "Contracts/Contacts"
    });

    contracts.map(async contract => {
      await ApiMiddleware.getData(
        `/collectivites/contrats/${contract.id}/entite`
      )
        .then(response => {
          if (
            response &&
            response.body &&
            this.state.entities.filter(
              entity => entity.entiteId === response.body.entiteId
            ).length === 0
          )
            this.setState(state => ({
              ...state,
              entities: [...state.entities, response.body]
            }));
        })
        .catch(e => {
          console.log("Could not receive entities");
        });
    });
  }

  render() {
    const { entities } = this.state;
    const { contractContacts } = this.props;

    return (
      <div className={styles.ContactsContainer}>
        <Row>
          {/* {contacts.map((contact, index) => {
            return (
              <ContactContainer key={index} item={contact}/>
            );
          })} */}
          {entities.map(entity => {
            if (entity.entiteId === 1) {
              return (
                <Fragment>
                  <Col sm="4">
                    <div
                      className={styles.TabBox}
                      key={`sortingAddresses-${entity.libelle}`}
                    >
                      <div className={styles.Header}>
                        <h4>Mon contact administratif</h4>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>FCR</span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>5, 7 rue des Piliers de la Chauvinière</span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>44800 SAINT HERBLAIN</span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>
                          <a href="tel:+33240169606" className={styles.noStyle}>
                            02 40 16 96 06
                          </a>
                        </span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>
                          <a href="mailto:fcrcollectivites@paprec.com">
                            fcrcollectivites@paprec.com
                          </a>
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col sm="4">
                    <div
                      className={styles.TabBox}
                      key={`sortingAddresses-${entity.libelle}`}
                    >
                      <div className={styles.Header}>
                        <h4>Mon contact traçabilité</h4>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>Pauline BERTHOLOM</span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>
                          <a href="mailto:pauline.bertholom@paprec.com">
                            pauline.bertholom@paprec.com
                          </a>
                        </span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>
                          <a href="tel:+33240169606" className={styles.noStyle}>
                            02 40 16 96 06
                          </a>
                        </span>
                      </div>
                    </div>
                  </Col>
                </Fragment>
              );
            } else {
              return (
                <Fragment>
                  <Col sm="4">
                    <div
                      className={styles.TabBox}
                      key={`sortingAddresses-${entity.libelle}`}
                    >
                      <div className={styles.Header}>
                        <h4>Mon contact administratif</h4>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>COVED VGO</span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>9 AV Didier Daurat</span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>BP94226</span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>31400 TOULOUSE</span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>
                          <a href="tel:+33562192425" className={styles.noStyle}>
                            05 62 19 24 25
                          </a>
                        </span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>
                          <a href="mailto:adv31@coved.com">adv31@coved.com</a>
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col sm="4">
                    <div
                      className={styles.TabBox}
                      key={`sortingAddresses-${entity.libelle}`}
                    >
                      <div className={styles.Header}>
                        <h4>Mon contact traçabilité</h4>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>Laure PONCELIN</span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>
                          <a href="mailto:laure.poncelin@coved.com">
                            laure.poncelin@coved.com
                          </a>
                        </span>
                      </div>
                      <div className={styles.GrayRow}>
                        <span>
                          <a href="tel:+33562192425" className={styles.noStyle}>
                            05 62 19 24 25
                          </a>
                        </span>
                      </div>
                    </div>
                  </Col>
                </Fragment>
              );
            }
          })}
          {contractContacts !== undefined && (
            <Col sm="4">
              <div className={styles.TabBox}>
                <div className={styles.Header}>
                  <h4>Mon contact commercial</h4>
                </div>
                <div className={styles.GrayRow}>
                  <span>
                    {contractContacts.prenom} {contractContacts.nom}
                  </span>
                </div>
                <div className={styles.GrayRow}>
                  <span>
                    <a href={`mailto:${contractContacts.email}`}>
                      {contractContacts.email}
                    </a>
                  </span>
                </div>
                <div className={styles.GrayRow}>
                  <span>
                    <a
                      href={`tel:${contractContacts.mobile}`}
                      className={styles.noStyle}
                    >
                      {contractContacts.mobile}
                    </a>
                  </span>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default Contacts;
