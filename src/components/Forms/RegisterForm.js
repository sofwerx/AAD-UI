import React, { Component } from 'react';

import { Button, Col, Icon, Row } from 'react-materialize';
import TextInput from './components/TextInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import UsernameInput from './components/UsernameInput';
import ListErrors from '../Common/ListErrors';

import {
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../../constants/actionTypes';
import agent from '../../agent';
import { connect } from 'react-redux';
const PropTypes = require('prop-types');

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (newUser) => {
    const payload = agent.auth.register(newUser);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    // Fields to generate TextFields
    this.textFields = ['first_name', 'last_name', 'job_title', 'company'];
    // Custom Fields
    this.customFields = ['username', 'email', 'password', 'password_confirmation'];
    this.stateFields = this.textFields.concat(this.customFields);

    // Add initial "controlled" state for all fields.
    let initialState = {};
    this.stateFields.forEach((textField) => {
        initialState[textField] = {
          value: '',
          hasValidValue: false
      };
    });
    this.state = initialState;
    this.handleInputV2 = this.handleInputV2.bind(this);
    this.validateAllFields = this.validateAllFields.bind(this);
    this.validatePasswordsMatch = this.validatePasswordsMatch.bind(this);


    this.submitForm = () => ev => {
      ev.preventDefault();
      if(this.validateAllFields) {
        let newUser = this.createUserRequest();
        delete newUser.password_confirmation;// Remove from request
        this.props.onSubmit(newUser);
      }
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

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
    this.validatePasswordsMatch();
  };

  // Create Obj to hold User Request
  createUserRequest = () => {
    let newUserRequest = {};
    this.stateFields.forEach((textField) => {
      newUserRequest[textField] = this.state[textField].value;
    });
    return newUserRequest;
  };

  // Validates Form Fields
  validateAllFields = () => {
    let formIsValid = true;
    this.stateFields.forEach((textField) => {
        if(this.state[textField].hasValidValue) formIsValid = false;
    });
    return formIsValid;
  };

  // Return TextFields
  createTextFields = (textFields) => {
    return textFields.map(fieldName => {
      return (
        <Col key={fieldName} s={12} m={3}>
          <TextInput
            name={fieldName}
            label={this.humanizeString(fieldName)}
            value={this.state[fieldName].value}
            onChange={this.handleInputV2}
            onBlur={this.handleInputV2}/>
        </Col>
      );
    });
  };

  // Humanize "sample_string" to Sample String
  humanizeString = (str) => {
    return str
      .replace(/[_\s]+/g, ' ')// Remove Underscores
      .replace(/\b[a-z]/g, function (m) {// Capitalize Words
        return m.toUpperCase();
      });
  };

  validatePasswordsMatch = () => {
    const password = this.state.password.value;
    const passwordConfirmation = this.state.password_confirmation.value;
    let passwordsMatch = true;
    if (password.length > 0 && passwordConfirmation.length > 0) {
      passwordsMatch = (password === passwordConfirmation);
    }
    this.setState(
      prevState => ({
        ...prevState,
        passValidationError: !passwordsMatch
      })
    );
  };

  render() {
    return (
      <div className="login-signup-wrapper">
        <form className="container-fluid" onSubmit={this.submitForm()}>
          <h4 className="signup-login-header">Signup</h4>
          <Row className="login-signup-form">
            <Row>
              {this.createTextFields(this.textFields)}
            </Row>
            <Row>
              <Col s={12} m={6}>
                <UsernameInput
                  value={this.state.username.value}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}/>{' '}
              </Col>
              <Col s={12} m={6}>
                <EmailInput
                  value={this.state.email.value}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}/>{' '}
              </Col>
            </Row>
            <Row>
              <Col s={12} m={6}>
                <PasswordInput
                  value={this.state.password.value}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}/>{' '}
              </Col>
              <Col s={12} m={6}>
                <PasswordInput
                  name={'password_confirmation'}
                  label="Confirm Password"
                  value={this.state.password_confirmation.value}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}/>{' '}
              </Col>
            </Row>
          <ListErrors errors={this.props.errors}/>
          {this.state.passValidationError ? <div className="error-text">Passwords must match.</div> : null }
          <Button
            large={true}
            disabled={this.props.inProgress}
            className={`login-signup-submit-button`}
            waves='light'>
            <Icon className="login-signup-button-icon">send</Icon>
          </Button>
        </Row>
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  onUnload: PropTypes.func,
  inProgress: PropTypes.bool,
  errors: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
