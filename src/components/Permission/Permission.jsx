import React, { Component } from 'react';
import UserStore from 'stores/UserStore';

class Permission extends Component {
  componentDidMount() {
    this.showIf = UserStore.checkUserPermission(this.props.componentPermName);
  }

  render() {
    return (
      <div className={this.showIf ? 'hide-children' : '' }>
        {this.props.children}
      </div>
    );
  }
}
export default Permission;
