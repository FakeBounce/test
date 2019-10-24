import React, { Component } from "react";
import styles from "./PaprecLogo.module.scss";

import Logo from "assets/images/top-right-logo.png";
import { Media } from "reactstrap";
import { translate } from "common/methods/translations";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
class PaprecLogo extends Component {
  @observable currentLanguage = localStorage.getItem("language");
  @observable tmp = translate("globals.header.help");

  render() {
    const { prapesHref } = this.props;
    return (
      <div className={styles.ColorImageContainer}>
        <a href={prapesHref} target="_blank">
          <Media className={styles.TopRightLogo} src={Logo} />
        </a>
      </div>
    );
  }
}
export default PaprecLogo;
