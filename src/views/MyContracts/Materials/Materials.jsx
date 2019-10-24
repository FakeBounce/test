import React, { Component } from "react";
import { ListGroup } from "reactstrap";
import styles from "./Materials.module.scss";
import MaterialContainer from "./MaterialContainer/MaterialContainer.jsx";
import { observer } from "mobx-react";
import { observable } from "mobx";
import MaterialService from "services/MaterialService";
import { translate } from "common/methods/translations";

import ReactGA from "react-ga";

@observer
class Materials extends Component {
  static tabName = "Materials";

  @observable contracts = [];
  @observable materials = [];

  async componentDidMount() {
    const { collectiviteInfo, contracts } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "Contracts/Materials"
    });

    ReactGA.event({
      category: `Global`,
      action: "Contracts/Materials"
    });

    this.contracts = contracts;
    for (const contract of this.contracts) {
      const material = { sortingCenter: contract.place };
      material.items = await MaterialService.getMaterialData(contract.id);
      this.materials.push(material);
    }
  }

  render() {
    return (
      <div className={styles.MaterialsContainer}>
        <span className={styles.ElementsCount}>
          {this.materials.length} {translate("myContracts.materials.sortingCenter")}
        </span>
        <ListGroup>
          {this.materials.map((material, index) => {
            return <MaterialContainer key={index} item={material} />;
          })}
        </ListGroup>
      </div>
    );
  }
}

export default Materials;
