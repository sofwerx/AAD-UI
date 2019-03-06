import React, { Component } from 'react';

import { Button, Col, Icon, Input, Row } from 'react-materialize';
import {
  UPDATE_USER_INFO
} from '../../constants/actionTypes';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onSubmit: (userId, updatedUser) => {
    console.log(updatedUser);
    const payload = agent.auth.save(userId, updatedUser);
    dispatch({
      type: UPDATE_USER_INFO,
      payload
    });
  }
});

class PasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordForm: {
        password: '',
        password_confirmation: ''
      }
    };
    this.handleInputV2 = this.handleInputV2.bind(this);

    this.updatedPassword = () => {
      console.log(this.state.passwordForm.password);
      return {
        password: this.state.passwordForm.password
      };
    };

    this.submitForm = () => ev => {
      ev.preventDefault();
      const userId = this.props.currentUser.id;
      this.props.onSubmit(userId, this.updatedPassword());
    };
  }

  handleInputV2 = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let notValid = e.target.notValid;
    this.setState(
      prevState => ({
        passwordForm: {
          ...prevState.passwordForm,
          [name]: value
        },
        errors: {
          ...prevState.errors,
          [name]: notValid
        }
      })
    );
  };

  render() {
    return (
      <div className="passwordForm">
        <Row>
          <Col s={6}>
            <label>New Password</label>
            <input
              type={'password'}
              name={'password'}
              value={this.state.passwordForm.password}
              onChange={evt => this.handleInputV2(evt)}/>
          </Col>
          <Col s={6}>
            <Input
              required
              type={'password'}
              name={'password_confirmation'}
              value={this.state.passwordForm.password_confirmation}
              onChange={evt => this.handleInputV2(evt)}
              label="Confirm Password"
              s={12}/>{' '}
          </Col>
        </Row>
        <Row className='center'>
          <Button
            onClick={this.submitForm()}
            s={12}
            className="login-signup-submit-button">
            Update Password
            <Icon right>check</Icon>
          </Button>
        </Row>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(PasswordForm);
