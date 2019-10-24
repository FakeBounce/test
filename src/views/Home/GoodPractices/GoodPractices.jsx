import React, { Component, Fragment } from "react";
import { Col, ListGroup, ListGroupItem } from "reactstrap";
import styles from "./GoodPractices.module.scss";
import thumbnail_france_plastique from "assets/images/thumbnail_france_plastique.png";
import thumbnail_paprec_group from "assets/images/thumbnail_paprec_group.png";
import thumbnail_pet from "assets/images/thumbnail_pet.png";
import ReactPlayer from "react-player";
import { translate } from "common/methods/translations";

class GoodPractices extends Component {
  state = {
    currentVideoPlaying: -1
  };

  setVideoPlaying = id => () => {
    this.setState(state => ({
      ...state,
      currentVideoPlaying: id
    }));
  };

  cancelVideoPlaying = () => {
    this.setState(state => ({
      ...state,
      currentVideoPlaying: -1
    }));
  };

  render() {
    const { currentVideoPlaying } = this.state;
    return (
      <Col sm="8">
        <div className={`${styles.DashboardBox} ${styles.Box4}`}>
          <h4>{translate("home.myGoodPractices")}</h4>
          <ListGroup>
            <ListGroupItem>
              {currentVideoPlaying === -1 ? (
                <Fragment>
                  <div className={styles.PDF}>
                    <div
                      className={styles.ItemImage}
                      onClick={this.setVideoPlaying(1)}
                    >
                      <ReactPlayer
                        url="https://fr-lbmvapp003:44302/api/collectivites/videos/1"
                        controls
                        width={"100%"}
                        height={"100%"}
                        className={styles.Video}
                        light={thumbnail_pet}
                      />
                    </div>
                    <div className={styles.Description}>
                      <p> Recyclage PET</p>
                      {/*<label>*/}
                      {/*  Descriptif de trois lignes avec un maximum de caractères à*/}
                      {/*  respecter.*/}
                      {/*</label>*/}
                    </div>
                  </div>
                  <div className={styles.PDF}>
                    <div
                      className={styles.ItemImage}
                      onClick={this.setVideoPlaying(2)}
                    >
                      <ReactPlayer
                        url="https://fr-lbmvapp003:44302/api/collectivites/videos/2"
                        controls
                        width={"100%"}
                        height={"100%"}
                        className={styles.Video}
                        light={thumbnail_paprec_group}
                      />
                    </div>
                    <div className={styles.Description}>
                      <p>Présentation Paprec Groupe</p>
                      {/*<label>*/}
                      {/*  Descriptif de trois lignes avec un maximum de caractères à*/}
                      {/*  respecter.*/}
                      {/*</label>*/}
                    </div>
                  </div>
                  <div className={styles.PDF}>
                    <div
                      className={styles.ItemImage}
                      onClick={this.setVideoPlaying(3)}
                    >
                      <ReactPlayer
                        url="https://fr-lbmvapp003:44302/api/collectivites/videos/3"
                        controls
                        width={"100%"}
                        height={"100%"}
                        className={styles.Video}
                        light={thumbnail_france_plastique}
                      />
                    </div>
                    <div className={styles.Description}>
                      <p>Présentation de France Plastique Recyclage</p>
                      {/*<label>*/}
                      {/*  Descriptif de trois lignes avec un maximum de caractères à*/}
                      {/*  respecter.*/}
                      {/*</label>*/}
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div
                    className={`${styles.Description} ${styles.clickable}`}
                    onClick={this.cancelVideoPlaying}
                  >
                    <label>Annuler</label>
                  </div>
                  <ReactPlayer
                    url={`https://fr-lbmvapp003:44302/api/collectivites/videos/${currentVideoPlaying}`}
                    controls
                    width={"100%"}
                    height={"100%"}
                    className={styles.Video}
                    playing
                  />
                </Fragment>
              )}
            </ListGroupItem>
          </ListGroup>
        </div>
      </Col>
    );
  }
}

export default GoodPractices;
