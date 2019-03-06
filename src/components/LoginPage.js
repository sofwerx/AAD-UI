import React, { Component } from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';
import '../assets/css/login.css';

import { Row, Input, Button, Icon } from 'react-materialize';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({
      type: UPDATE_FIELD_AUTH,
      key: 'email',
      value
    }),
  onChangePassword: value =>
    dispatch({
      type: UPDATE_FIELD_AUTH,
      key: 'password',
      value
    }),
  onSubmit: (email, password) =>
    dispatch({
      type: LOGIN,
      payload: agent.auth.login(email, password)
    }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <main>
        <h4 className="signup-login-header login-header">Login</h4>
        <form onSubmit={this.submitForm(email, password)}>

          <Row className="login-signup-form">
            <Input
              value={email}
              onChange={this.changeEmail}
              s={12}
              type="email"
              label="Email"/>
            <Input
              value={password}
              onChange={this.changePassword}
              s={12}
              type="password"
              label="Password"/>
            <Button
              type="submit"
              disabled={this.props.inProgress}
              large={true}
              waves='light'>
              <Icon className="login-signup-button-icon">send</Icon>
            </Button>
          </Row>
        </form>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
