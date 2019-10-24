import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./MyProfile.module.scss";
import MainLayout from "components/MainLayout/MainLayout.jsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.jsx";
import Header from "elements/Header";
import { observer } from "mobx-react";
import { observable } from "mobx";
import PersonalInformations from "./PersonalInformations/PersonalInformations.jsx";
import Alerts from "./Alerts/Alerts.jsx";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { translate } from "common/methods/translations";


import CurrentUserStore from "stores/CurrentUserStore";
import ImageModal from "components/Modals/ImageModal/ImageModal";
import ReactGA from "react-ga";
import { ClientContext } from "../../common/consts/ClientContext";

const availableNavs = [PersonalInformations, Alerts];

@withRouter
@observer
class MyProfile extends Component {
  @observable activeTab = "";
  @observable imageModalOpen = false;
  @observable editor = null;

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.openImageModal = this.openImageModal.bind(this);
  }

  componentDidMount() {
    const { collectiviteInfo } = this.props;

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "myProfile"
    });

    ReactGA.event({
      category: `Global`,
      action: "myProfile"
    });

    const { tabName } = this.props.match.params;
    const availableNavsStrings = availableNavs.map(nav => {
      return nav.tabName.toLowerCase();
    });

    if (!tabName || !availableNavsStrings.includes(tabName)) {
      this.setUrl(availableNavs[0].tabName);
      this.setTab(`${availableNavs[0].tabName.toLowerCase()}`);
    } else {
      this.setUrl(tabName);
      this.setTab(`${tabName.toLowerCase()}`);
    }
  }

  setUrl(pathUrl) {
    const { history } = this.props;
    history.push(`/myProfile/${pathUrl.toLowerCase()}`);
  }

  setTab(tab) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
    }
  }

  toggle(tab) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
    }
  }

  openImageModal() {
    this.imageModalOpen = true;
  }

  confirmImageModalYesButtonClick() {
    this.imageModalOpen = false;
    if (this.editor) {
      const canvas = this.editor.getImage();

      const dataURL = canvas.toDataURL();

      // TODO: upload user image.
      console.log(dataURL);
    }
  }

  confirmImageModalNoButtonClick() {
    this.imageModalOpen = false;
  }

  setEditorRef(editor) {
    this.editor = editor;
  }

  render() {
    const breadcrumbElements = [
      { name: "home", href: "/home" },
      { name: "myProfile", isActive: true }
    ];
    const { currentUser } = CurrentUserStore;
    return (
      <MainLayout {...this.props}>
        <Breadcrumbs elements={breadcrumbElements} />
        <Header>{translate("globals.menu.myProfile")}</Header>
        <div className={styles.MyProfile}>
          <div className={styles.AvatarSection}>
            <div className={styles.Avatar} onClick={this.openImageModal}>
              <h4>
                {currentUser.firstName ? currentUser.firstName.charAt(0) : ""}
                {currentUser.lastName ? currentUser.lastName.charAt(0) : ""}
              </h4>
            </div>
            <div className={styles.UserInfo}>
              <h4>
                {currentUser.firstName} {currentUser.lastName}{" "}
              </h4>
              <span>{currentUser.email}</span>
              <span>{currentUser.profile}</span>
            </div>
          </div>
          <div className={styles.TabsSection}>
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
                      {translate(`myProfile.submenu.${nav.tabName}`).toUpperCase()}
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
            <TabContent activeTab={this.activeTab}>
              {availableNavs.map((Nav, index) => {
                return (
                  <ClientContext.Consumer>
                    {({ collectiviteInfo }) => (
                      <TabPane
                        collectiviteInfo={collectiviteInfo}
                        tabId={`${Nav.tabName.toLowerCase()}`}
                        key={index}
                      >
                        <Nav />
                      </TabPane>
                    )}
                  </ClientContext.Consumer>
                );
              })}
            </TabContent>
          </div>
        </div>
        <ImageModal
          isOpen={this.imageModalOpen}
          title={translate("myProfile.personalInformation.changeUserImage")}
          handleYesButtonClick={this.confirmImageModalYesButtonClick.bind(this)}
          handleNoButtonClick={this.confirmImageModalNoButtonClick.bind(this)}
          setEditorRef={this.setEditorRef.bind(this)}
          toggle={this.confirmImageModalNoButtonClick.bind(this)}
        />
      </MainLayout>
    );
  }
}

export default MyProfile;
