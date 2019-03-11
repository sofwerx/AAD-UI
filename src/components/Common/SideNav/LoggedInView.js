import React from 'react';
import { Icon, SideNav } from 'react-materialize';
import SideNavItem from './SideNavItem';
const PropTypes = require('prop-types');

class LoggedInView extends React.Component {
  render() {
    if (this.props.currentUser) {
      return (
        <div>
          <SideNav
            id="logged-in-nav"
            trigger={<div className="valign-wrapper hamburger-menu-icon-container">
              <span className="uppercase">{this.props.currentUser.username}</span>
              <Icon className="hamburger">menu</Icon>
            </div>}
            options={{
              closeOnClick: true,
              edge: 'right'
            }}>
            <SideNavItem linkTo="/dashboard" label="Home"/>
            <SideNavItem linkTo="/portal" label="Portal"/>
            <SideNavItem linkTo="/reviews" label="Submitted Feedback"/>
            <SideNavItem linkTo="/public" label="Public Reviews"/>
            <SideNavItem linkTo="/statistics" label="The Stats"/>
            <SideNavItem linkTo="/profile" label="Edit Profile"/>
            <SideNavItem onClick={this.props.onClickLogout} linkTo="/logout" label="Logout"/>
          </SideNav>
        </div>
      );
    }
    return null;
  }
}

LoggedInView.propTypes = {
  onClickLogout: PropTypes.func,
  currentUser: PropTypes.object
};

export default LoggedInView
