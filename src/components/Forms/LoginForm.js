import React, { Component } from 'react';

import { Button, Col, Icon, Row } from 'react-materialize';
import { LOGIN, LOGIN_PAGE_UNLOADED } from '../../constants/actionTypes';
import agent from '../../agent';
import { connect } from 'react-redux';
import ListErrors from '../Common/ListErrors';
import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
const PropTypes = require('prop-types');

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, password) =>
    dispatch({ type: LOGIN, payload: agent.auth.login(username, password)
    }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED })
});

const mapStateToProps = state => ({ ...state.auth });

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.inputFields = ['username', 'password'];

    let initialState = {};
    this.inputFields.forEach((inputField) => {
      initialState[inputField] = {
        value: '',
        hasValidValue: false
      };
    });

    this.state = initialState;
    this.handleInputV2 = this.handleInputV2.bind(this);

    this.submitForm = () => ev => {
      ev.preventDefault();
      if(this.formValidation(ev)) {
        this.props.onSubmit(this.state.username.value, this.state.password.value);
      }
    };
  }

  formValidation = (e) => {
    const usernameState = this.state.username;
    const passwordState = this.state.password;
    return usernameState.hasValidValue && passwordState.hasValidValue;
  };

  handleInputV2 = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let hasValidValue = (e.target.hasValidValue === undefined) ? false : e.target.hasValidValue;

    this.setState(
      prevState => ({
          ...prevState,
          [name]: {
            value,
            hasValidValue
          }
      })
    );
  };

  render() {
    return (
      <form className="container-fluid" onSubmit={this.submitForm()}>
        <div className ="loginForm " >
          <Row className="login-signup-form ">
            <Col s={12} l={6} className={"offset-l3"}>
              <UsernameInput
                value={this.state.username.value}
                onChange={this.handleInputV2}
                onBlur={this.handleInputV2}/>{' '}
            </Col>
            <Col s={12} l={6} className={"offset-l3"}>
              <PasswordInput
                value={this.state.password.value}
                onChange={this.handleInputV2}
                onBlur={this.handleInputV2}/>{' '}
            </Col>
          </Row>
          <Row className='center'>
            <ListErrors errors={this.props.errors}/>
            <Button
              large={true}
              disabled={this.props.inProgress}
              className={`login-signup-submit-button`}
              waves='light'>
              <Icon className="login-signup-button-icon">send</Icon>
            </Button>
          </Row>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func,
  inProgress: PropTypes.bool,
  errors: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
