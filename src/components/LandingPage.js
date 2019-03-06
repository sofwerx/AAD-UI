import React, { Component } from 'react';
import '../assets/css/landingPage.css';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';

import {
  LANDING_PAGE_LOADED,
  LANDING_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.landingPage,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) =>
    dispatch({
      type: LANDING_PAGE_LOADED,
      tab,
      pager,
      payload
    }),
  onUnload: () =>
    dispatch({ type: LANDING_PAGE_UNLOADED })
});

class LandingPage extends Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div>
        <main className="landing-page">
          <div id="aad-title-container">
            <div className="aad-title">ADVANCED</div>
            <div className="aad-title">ANALYTIC</div>
            <div className="aad-title">DEMONSTRATOR</div>
          </div>

          <div className="typewriter" id="aad-paragraph">
            <h5 id="typing">
              Test tools. Give Feedback. Move Forward.
            </h5>
          </div>
          <div id="signup-login-buttons-container">
            <Link to="/register">
              <Button large={true} className="signup-login-buttons" waves='light'>Signup</Button>
            </Link>
            <Link to="/login">
              <Button large={true} className="signup-login-buttons" waves='light'>Login</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

