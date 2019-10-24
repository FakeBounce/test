import React, { Component } from "react";
import styles from "./Loader.module.scss";

class Loader extends Component {
  render() {
    const show = this.props.show;
    if (show) {
      return (
        <div className={styles.CsLoader}>
          <div className={styles.CsLoaderInner}>
            <label> ●</label>
            <label> ●</label>
            <label> ●</label>
            <label> ●</label>
            <label> ●</label>
            <label> ●</label>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Loader;
