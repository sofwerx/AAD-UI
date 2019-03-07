import React from 'react';
import { Icon, SideNav } from 'react-materialize';
import SideNavItem from './SideNavItem';
const PropTypes = require('prop-types');

class LoggedOutView extends React.Component {
  render() {
    if (!this.props.currentUser) {
      return (
        <SideNav
          id="logged-out-nav"
          trigger={
            <div className="hamburger-menu-icon-container">
              <Icon className="hamburger">menu</Icon>
            </div>
          }
          options={{
            closeOnClick: true,
            edge: 'right'
          }}
        >
          <SideNavItem linkTo="/login" label="Login"/>
          <SideNavItem linkTo="/register" label="Signup"/>
        </SideNav>
      );
    }
    return null;
  }
}

LoggedOutView.propTypes = {
  currentUser: PropTypes.object
};

export default LoggedOutView
