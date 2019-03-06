import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Icon, SideNav } from 'react-materialize';

import '../../assets/css/header.css';
import connect from 'react-redux/es/connect/connect';
import { LOGOUT } from '../../constants/actionTypes';

const LoggedOutView = props => {
  if (!props.currentUser) {
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
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <div>
        <SideNav
          id="logged-in-nav"
          trigger={<div className="valign-wrapper hamburger-menu-icon-container">
            <span className="uppercase">{props.currentUser.username}</span>
            <Icon className="hamburger">menu</Icon>
          </div>}
          options={{
            closeOnClick: true,
            edge: 'right'
          }}>
          <SideNavItem linkTo="/dashboard" label="Home"/>
          <SideNavItem linkTo="/portal" label="Portal"/>
          <SideNavItem linkTo="/public" label="Public Reviews"/>
          <SideNavItem linkTo="/statistics" label="The Stats"/>
          <SideNavItem linkTo="/profile" label="Edit Profile"/>
          <SideNavItem onClick={props.onClickLogout} linkTo="/logout" label="Logout"/>
        </SideNav>
      </div>
    );
  }
  return null;
};

const SideNavItem = props => {
  const linkTo = props.linkTo;
  const label = props.label;
  return (
    <li className="border-bottom">
            <span>
                <Link onClick={props.onClick} className="link" to={linkTo}>{label}</Link>
            </span>
    </li>
  );
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT })
});

class Header extends React.Component {
  render() {
    return (
      <Navbar className="navbar-logo"
              brand={<span className="sof-aad-header valign-wrapper">SOF AAD</span>}
              right>
        <LoggedOutView currentUser={this.props.currentUser}/>
        <LoggedInView currentUser={this.props.currentUser} onClickLogout={this.props.onClickLogout}/>
      </Navbar>
    );
  }
}

export default connect(null, mapDispatchToProps)(Header);

