import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from "mobx";
import Stepper from 'react-stepper-horizontal';
import styles from './FirstLogin.module.scss';
import FirstStage from './FirstStage/FirstStage.jsx';
// import SecondStage from './SecondStage/SecondStage.jsx';
import ThirdStage from './ThirdStage/ThirdStage.jsx';
import FourthStage from './FourthStage/FourthStage.jsx';
import {Container, Media} from 'reactstrap';
//import Logo from 'assets/images/recyclageByNodus.svg';
import Logo from 'assets/images/nodusRecyclageLogo.svg';

import { translate } from "common/methods/translations";
import CollectiviteService from "services/CollectiviteService";
import CollectiviteAddressService from "services/CollectiviteAddressService";
// import UserService from "services/UserService";
import CurrentUserService from 'services/CurrentUserService';

@observer
class FirstLogin extends Component {
  @observable formsStage = 0;
  @observable firstStageData = observable({});
  @observable thirdStageData = observable({});
  @observable fourthStageData = observable({});
  @observable collectiviteInfo = {};
  // @observable siegeSocialAddress = {};
  @observable etablissementAddress = {};
  @observable tresorPublicAddress = {};
  @observable isAdmin = false;

  constructor() {
    super();
    this.stageSwitcher = this.stageSwitcher.bind(this);
    this.changeStage = this.changeStage.bind(this);
    this.submitForms = this.submitForms.bind(this);
    this.handleFirstStageData = this.handleFirstStageData.bind(this);
    this.handleThirdStageData = this.handleThirdStageData.bind(this);
    this.handleFourthStageData = this.handleFourthStageData.bind(this);
    this.exitForm = this.exitForm.bind(this);
  }

  async componentDidMount() {
    await this.getCollectiviteInfo();
    await this.getCollectiviteAddresses();
    this.isAdmin = await this.getCurrentUserProfil();
  }

  async getCurrentUserProfil(){
    const currentUser = await CurrentUserService.getUserInfo();
    return currentUser.userType === 0 ? false : true ;
  }

  async getCollectiviteInfo() {
    this.collectiviteInfo = await CollectiviteService.getCurrentCollectivite();
  }

  async getCollectiviteAddresses() {
    const addresses = await CollectiviteAddressService.getCurrentCollectiviteAddresses();
    // this.siegeSocialAddress = addresses.find(address => address.type === 'SC') || { type: 'SC', address_2: ''};
    this.etablissementAddress = addresses.find(address => address.type === 'E') || { type: 'E', address_2: ''};
    this.tresorPublicAddress = addresses.find(address => address.type === 'TP') || { type: 'TP', address_2: ''};
  }

  changeStage(stage) {
    this.formsStage = this.formsStage + stage;
  }

  async submitForms() {
    const {history} = this.props
    const collectiviteParam = {
      id : this.collectiviteInfo.id,
      ecoOrganismeCode: this.collectiviteInfo.code,
      collectivityName: this.collectiviteInfo.name,
      dateModification: new Date()
    }
    await CollectiviteService.updateCurrentCollectivite(collectiviteParam);
    // await CollectiviteAddressService.updateCollectiviteAddresses([this.siegeSocialAddress, this.etablissementAddress, this.tresorPublicAddress]);
    await CollectiviteAddressService.updateCollectiviteAddresses([this.etablissementAddress, this.tresorPublicAddress]);
    history.push('/home');
  }

  handleFirstStageData(firstStageData) {
    this.firstStageData = firstStageData;
    this.collectiviteInfo.code = firstStageData.ecoOrganismCode;
  }

  handleThirdStageData(thirdStage) {
    this.thirdStageData = thirdStage;
    this.etablissementAddress.address_1 = thirdStage.streetNameAndNumber;
    this.etablissementAddress.postalCode = thirdStage.postalCode;
    this.etablissementAddress.city = thirdStage.city;
  }

  handleFourthStageData(fourthStage) {
    this.fourthStageData = fourthStage;
    this.tresorPublicAddress.address_1 = fourthStage.streetNameAndNumber;
    this.tresorPublicAddress.postalCode = fourthStage.postalCode;
    this.tresorPublicAddress.city = fourthStage.city;
  }

  exitForm(){
    const {history} = this.props;
    history.push('/home');
  }

  stageSwitcher() {
    switch (this.formsStage) {
      case 0:
        return (
          <FirstStage
            firstStageData={this.handleFirstStageData}
            changeStage={this.changeStage}
            collectiviteName={this.collectiviteInfo.name}
            collectiviteCode={this.collectiviteInfo.code}
          />
        );
      // case 1:
      //   return (
      //     <SecondStage
      //       changeStage={this.changeStage}
      //       siegeSocialAddress={this.siegeSocialAddress}
      //     />
      //   );
      case 1:
        return (
          <ThirdStage
            thirdStageData={this.handleThirdStageData}
            changeStage={this.changeStage}
            etablissementAddress={this.etablissementAddress}
          />
        );
      case 2:
        return (
          <FourthStage
            fourthStageData={this.handleFourthStageData}
            changeStage={this.changeStage}
            submitForms={this.submitForms}
            tresorPublicAddress={this.tresorPublicAddress}
          />
        );
      default:
        break;
    }
  }

  render() {
    const steps = [{}, {}, {}];
    return (
      <Container fluid className={styles.Background}>
        <div className={styles.FirstLoginModal}>
          <div className={styles.LogoSection}>
            <Media src={Logo}/>
            <span>Version 2.00.XXXX - © 2018 - Paprec Group</span>
          </div>
          <div className={styles.LoginForm}>
            {this.isAdmin && <span className={styles.exit} onClick={this.exitForm}>X</span>}
            <h3>{translate('firstLoginPage.welcome')}</h3>
            <div className={styles.StepperContainer}>
              <Stepper steps={steps} activeStep={this.formsStage} className="Steps"/>
            </div>
            {this.stageSwitcher()}
          </div>
        </div>
      </Container>
    );
  }
}

export default FirstLogin;
