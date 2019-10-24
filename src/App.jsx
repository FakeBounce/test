import React, { Component, lazy, Suspense } from "react";
import styles from "./App.module.scss";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { setMomentGlobalLang } from "common/methods/momentGlobals";
import LoggedInOnly from "components/LoggedInOnly.jsx";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import { TRACKING_ID } from "./common/consts/common";
import { ClientContext } from "./common/consts/ClientContext";

const Home = lazy(() => import("./views/Home/Home.jsx"));
const MyReports = lazy(() => import("./views/MyReports/MyReports.jsx"));
const MyRemovals = lazy(() => import("./views/MyRemovals/MyRemovals.jsx"));
const MyCollaborativeSpace = lazy(() =>
  import("./views/MyCollaborativeSpace/MyCollaborativeSpace.jsx")
);
const MyContracts = lazy(() => import("./views/MyContracts/MyContracts.jsx"));
const LoginPage = lazy(() => import("./views/LoginPage/LoginPage.jsx"));
const FirstLogin = lazy(() => import("./views/FirstLogin/FirstLogin.jsx"));
const ResetPassword = lazy(() =>
  import("./views/ResetPassword/ResetPassword.jsx")
);
const GlobalSearch = lazy(() => import("./views/GlobalSearch/GlobalSearch"));
const MyProfile = lazy(() => import("./views/MyProfile/MyProfile"));
const NotFound = lazy(() => import("./views/NotFound/NotFound.jsx"));
const ErrorPage = lazy(() => import("./views/ErrorPage/ErrorPage.jsx"));
const MyFiles = lazy(() => import("./views/MyFiles/MyFiles"));

const history = createBrowserHistory();

// Initialize google analytics page view tracking

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize(TRACKING_ID);
  // ReactGA.set({ page: window.location.pathname }); // Update the user's current page
  ReactGA.pageview(window.location.pathname + window.location.search); // Record a pageview for the given page
}

class App extends Component {
  state = {
    collectiviteInfo: ""
  };

  setCurrentCollectiviteInfo = siren => {
    this.setState(state => ({
      ...state,
      collectiviteInfo: siren
    }));
  };

  componentDidMount() {
    setMomentGlobalLang(localStorage.getItem("language") || "FR");
    this.setState(state => ({
      ...state,
      collectiviteInfo: localStorage.getItem("collectiviteInfo") || ""
    }));
  }

  render() {
    const { collectiviteInfo } = this.state;
    return (
      <div className={styles.App}>
        <BrowserRouter>
          <ClientContext.Provider
            value={{
              collectiviteInfo
            }}
          >
            <Suspense fallback={<div />}>
              {/* <Switch>
              <Route exact path={'/login'} component={LoginPage} history={history} />
              <Route exact path={'/login/:portalSiren'} component={LoginPage} history={history} />
              <Route path={'/resetPassword/:token'} component={ResetPassword} history={history} />
              <LoggedInOnly path={'/firstLogin'} component={FirstLogin} history={history} />
              <LoggedInOnly path={'/home'} component={Home} history={history} />
              <LoggedInOnly path={'/myRemovals'} component={MyRemovals} history={history} />
              <LoggedInOnly path={'/myFiles'} component={MyFiles} history={history} />
              <LoggedInOnly path={'/myReports'} component={MyReports} history={history} />
              <LoggedInOnly path={'/myCollaborativeSpace'} component={MyCollaborativeSpace} history={history} />
              <LoggedInOnly path={'/myContracts/:tabName'} component={MyContracts} history={history} />
              <LoggedInOnly path={'/globalSearch'} component={GlobalSearch} history={history} />
              <LoggedInOnly path={'/myProfile/:tabName'} component={MyProfile} history={history} />          
              <Redirect from='/myProfile' to='/myProfile/personalInformation' history={history} />
              <Redirect from='/myContracts' to='/myContracts/information' history={history} />
              <Redirect from='/' to='/login' history={history} />
              <Route path="/errorPage" component={ErrorPage} history={history} />
              <Route path="*" component={NotFound} history={history} />
            </Switch> */}
              <Switch>
                <Route
                  exact
                  path={"/login"}
                  render={props => (
                    <LoginPage
                      {...props}
                      setCurrentCollectiviteInfo={
                        this.setCurrentCollectiviteInfo
                      }
                      history={history}
                    />
                  )}
                />
                <Route
                  exact
                  path={"/login/:portalSiren"}
                  render={props => (
                    <LoginPage
                      {...props}
                      setCurrentCollectiviteInfo={
                        this.setCurrentCollectiviteInfo
                      }
                      history={history}
                    />
                  )}
                />
                <Route
                  path={"/resetPassword/:token"}
                  render={props => (
                    <ResetPassword {...props} history={history} />
                  )}
                />
                <LoggedInOnly
                  path={"/firstLogin"}
                  component={FirstLogin}
                  history={history}
                />
                <LoggedInOnly
                  path={"/home"}
                  component={Home}
                  collectiviteInfo={collectiviteInfo}
                  history={history}
                />
                <LoggedInOnly
                  path={"/myRemovals"}
                  component={MyRemovals}
                  collectiviteInfo={collectiviteInfo}
                  history={history}
                />
                <LoggedInOnly
                  path={"/myFiles"}
                  component={MyFiles}
                  collectiviteInfo={collectiviteInfo}
                  history={history}
                />
                <LoggedInOnly
                  path={"/myReports"}
                  component={MyReports}
                  collectiviteInfo={collectiviteInfo}
                  history={history}
                />
                <LoggedInOnly
                  path={"/myCollaborativeSpace"}
                  component={MyCollaborativeSpace}
                  collectiviteInfo={collectiviteInfo}
                  history={history}
                />
                <LoggedInOnly
                  path={"/myContracts/:tabName"}
                  component={MyContracts}
                  history={history}
                />
                <LoggedInOnly
                  path={"/globalSearch"}
                  component={GlobalSearch}
                  collectiviteInfo={collectiviteInfo}
                  history={history}
                />
                <LoggedInOnly
                  path={"/myProfile/:tabName"}
                  component={MyProfile}
                  history={history}
                />
                <Redirect
                  from="/myProfile"
                  to="/myProfile/personalInformation"
                  history={history}
                />
                <Redirect
                  from="/myContracts"
                  to="/myContracts/information"
                  history={history}
                />
                <Redirect from="/" to="/login" history={history} />
                <Route
                  path="/errorPage"
                  render={props => <ErrorPage {...props} history={history} />}
                />
                <Route
                  path="*"
                  render={props => <NotFound {...props} history={history} />}
                />
              </Switch>
            </Suspense>
          </ClientContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
