import React from 'react';
import { Navbar } from 'react-materialize';

import '../../assets/css/header.css';
import connect from 'react-redux/es/connect/connect';
import { LOGOUT } from '../../constants/actionTypes';
import LoggedInView from './SideNav/LoggedInView';
import LoggedOutView from './SideNav/LoggedOutView';
const PropTypes = require('prop-types');

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

Header.propTypes = {
  currentUser: PropTypes.object,
  onClickLogout: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Header);

