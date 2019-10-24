import React, { Component } from 'react';
import styles from './MainLayout.module.scss';
import UpperBar from 'components/UpperBar/UpperBar.jsx';
import SideMenu from 'components/SideMenu/SideMenu.jsx';
import CurrentUserStore from "../../stores/CurrentUserStore";
import CurrentCollectiviteStore from "../../stores/CurrentCollectiviteStore";

import { observer } from 'mobx-react';
import { observable } from "mobx";

import { LOAD_STATES } from 'common/consts/common';

@observer
class MainLayout extends Component {
  @observable loadState = LOAD_STATES.LOADING;

  async componentDidMount() {
    await CurrentUserStore.fetchUserInformation();
    await CurrentCollectiviteStore.fetchCurrentCollectiviteInformations();
    this.loadState = LOAD_STATES.LOADED;
  }

  render() {
    const { history, children } = this.props;
    //const { portalSiren } = this.props.match.params;
    return (
      this.isLoaded() &&
      <div className={styles.WholePageContainer}>
        <UpperBar history={history}/>
        <SideMenu history={history}/>
        <div className={styles.ContentContainer}>
          { children }
        </div>
      </div>
    );
  }

  isLoaded() {
    return this.loadState === LOAD_STATES.LOADED;
  }
}

export default MainLayout;
