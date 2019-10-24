import React, { Component } from "react";
import styles from "./FirstStage.module.scss";
import { Input, Button, Label, InputGroup } from "reactstrap";

import { translate } from "common/methods/translations";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
class FirstStage extends Component {
  @observable ecoOrganismCode = "";

  constructor(props) {
    super(props);
    this.ecoOrganismCode = this.props.collectiviteCode || "";
    this.nextPageHandler = this.nextPageHandler.bind(this);
    this.handleActiveGroupInputChange = this.handleActiveGroupInputChange.bind(
      this
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collectiviteCode !== this.props.collectiviteCode) {
      this.ecoOrganismCode = this.props.collectiviteCode;
    }
  }

  handleActiveGroupInputChange(event) {
    this.ecoOrganismCode = event.target.value;
  }

  nextPageHandler() {
    const { changeStage, firstStageData } = this.props;
    firstStageData({ ecoOrganismCode: this.ecoOrganismCode });
    changeStage(+1);
  }

  render() {
    const code = translate("firstLoginPage.codeEcoOrganisme");
    const { collectiviteName } = this.props;
    return (
      <div className={styles.Container}>
        <span>{translate("firstLoginPage.myInformation")}</span>
        <InputGroup className={styles.DisabledGroup}>
          <Input
            disabled
            type="text"
            placeholder={collectiviteName}
            className={styles.CommunityInput}
          />
          <Label>{translate("firstLoginPage.collectivityName")}</Label>
        </InputGroup>
        <InputGroup className={styles.ActiveGroup}>
          <Input
            type="text"
            required
            placeholder={code}
            value={this.ecoOrganismCode}
            onChange={this.handleActiveGroupInputChange}
          />
          <Label>{code}</Label>
        </InputGroup>
        <Button
          className={styles.FirstStageButton}
          onClick={this.nextPageHandler}
          disabled={this.ecoOrganismCode === ""}
        >
          {translate("globals.next").toUpperCase()}
        </Button>
      </div>
    );
  }
}

export default FirstStage;
