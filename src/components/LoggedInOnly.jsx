import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from "services/AuthService";
import { omit } from 'lodash';

export default class LoggedInOnly extends Component {
  constructor(props) {
    super(props);
    this.onRouteRender= this.onRouteRender.bind(this);
  }

  onRouteRender(props) {
    const { component } = this.props;
    const PassedComponent = component;
    if (AuthService.loggedIn()) {
      return <PassedComponent {...props}/>;
    }
    return <Redirect to="/" />;
  }

  render() {
    const props = omit(this.props, ['component']);
    return <Route {...props} render={this.onRouteRender} />;
  }
}
