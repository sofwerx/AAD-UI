import React, { Component } from 'react';

import { Button, Col, Icon, Row } from 'react-materialize';
import {
  UPDATE_USER_INFO
} from '../../constants/actionTypes';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onSubmit: (userId, updatedUser) => {
    const payload = agent.auth.save(userId, updatedUser);
    dispatch({
      type: UPDATE_USER_INFO,
      payload
    });
  }
});

class ProfileInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        ...props.currentUser
      }
    };
    this.handleInputV2 = this.handleInputV2.bind(this);

    this.updatedUser = () => {
      return {
        email: this.state.userForm.email,
        first_name: this.state.userForm.first_name,
        last_name: this.state.userForm.last_name,
        company: this.state.userForm.company,
        job_title: this.state.userForm.job_title
      };
    };

    this.submitForm = () => ev => {
      ev.preventDefault();
      const userId = this.state.userForm.id;
      this.props.onSubmit(userId, this.updatedUser());
    };
  }

  handleInputV2 = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let notValid = e.target.notValid;
    this.setState(
      prevState => ({
        userForm: {
          ...prevState.userForm,
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
      <div className="profileInfoForm" onSubmit={this.submitForm()}>
        <Row>
          <Col s={6}>
            <label>Username</label>
            <input
              type={'text'}
              disabled
              value={this.state.userForm.username}
              onChange={evt => this.handleInputV2(evt)}/>
          </Col>
          <Col s={6}>
            <label>Email</label>
            <input
              name={'email'}
              type={'text'}
              value={this.state.userForm.email}
              onChange={evt => this.handleInputV2(evt)}/>
          </Col>
          <Col s={6}>
            <label>First Name</label>
            <input
              name={'first_name'}
              type={'text'}
              value={this.state.userForm.first_name}
              onChange={evt => this.handleInputV2(evt)}/>
          </Col>
          <Col s={6}>
            <label>Last Name</label>
            <input
              name={'last_name'}
              type={'text'}
              value={this.state.userForm.last_name}
              onChange={evt => this.handleInputV2(evt)}/>
          </Col>
          <Col s={6}>
            <label>Job Title</label>
            <input
              name={'job_title'}
              type={'text'}
              value={this.state.userForm.job_title}
              onChange={evt => this.handleInputV2(evt)}/>
          </Col>
          <Col s={6}>
            <label>Company</label>
            <input
              name={'company'}
              type={'text'}
              value={this.state.userForm.company}
              onChange={evt => this.handleInputV2(evt)}/>
          </Col>
        </Row>
        <Row className='center'>
          <Button
            s={12}
            onClick={this.submitForm()}
            className="login-signup-submit-button">
            Update Profile
            <Icon right>check</Icon>
          </Button>
        </Row>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ProfileInfoForm);
