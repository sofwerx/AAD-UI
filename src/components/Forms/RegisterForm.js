import React, { Component } from 'react';

/* Import Components */
import TextInput from './components/TextInput';
import { Button, Col, Icon, Row } from 'react-materialize';
import UsernameInput from './components/UsernameInput';
import {
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../../constants/actionTypes';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (newUser) => {
    const payload = agent.auth.register(newUser);
    dispatch({
      type: REGISTER,
      payload
    });
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        job_title: '',
        company: '',
        password: '',
        password_confirmation: ''
      }
    };
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInputV2 = this.handleInputV2.bind(this);

    this.submitForm = () => ev => {
      ev.preventDefault();
      let newUser = this.state.newUser;
      delete newUser.password_confirmation;
      this.props.onSubmit(this.state.newUser);
    };
  }

  handleInputV2 = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let notValid = e.target.notValid;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        },
        errors: {
          ...prevState.errors,
          [name]: notValid
        }
      })
    );
  };

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        job_title: '',
        company: '',
        password: '',
        password_confirmation: ''
      }
    });
  }

  render() {
    return (
      <div className="login-signup-wrapper">
        <h4 className="signup-login-header">Signup</h4>
        <Row className="login-signup-form">
          <form className="container-fluid" onSubmit={this.submitForm()}>
            <Row>
              <Col s={3}>
                <TextInput
                  required
                  type={'text'}
                  name={'first_name'}
                  value={this.state.newUser.first_name}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}
                  label="First Name"
                  s={12}/>{' '}
              </Col>
              <Col s={3}>
                <TextInput
                  required
                  type={'text'}
                  name={'last_name'}
                  value={this.state.newUser.last_name}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}
                  label="Last Name"
                  s={12}/>{' '}
              </Col>
              <Col s={3}>
                <TextInput
                  required
                  type={'text'}
                  name={'job_title'}
                  value={this.state.newUser.job_title}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}
                  label="Job Title"
                  s={12}/>{' '}
              </Col>
              <Col s={3}>
                <TextInput
                  required
                  type={'text'}
                  name={'company'}
                  value={this.state.newUser.company}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}
                  label="Company"
                  s={12}/>{' '}
              </Col>
            </Row>
            <Row>
              <Col s={6}>
                <UsernameInput
                  required
                  name={'username'}
                  value={this.state.newUser.username}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}
                  s={12}/>{' '}
              </Col>
              <Col s={6}>
                <TextInput
                  required
                  type={'email'}
                  name={'email'}
                  value={this.state.newUser.email}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}
                  label="Email"
                  s={12}/>{' '}
              </Col>
            </Row>
            <Row>
              <Col s={6}>
                <TextInput
                  required
                  type={'password'}
                  name={'password'}
                  value={this.state.newUser.password}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}
                  label="Password"
                  s={12}/>{' '}
              </Col>
              <Col s={6}>
                <TextInput
                  required
                  type={'password'}
                  name={'password_confirmation'}
                  value={this.state.newUser.password_confirmation}
                  onChange={this.handleInputV2}
                  onBlur={this.handleInputV2}
                  label="Confirm Password"
                  s={12}/>{' '}
              </Col>
            </Row>
            <Button
              // onClick={this.submitForm}
              large={true}
              className={`login-signup-submit-button`}
              waves='light'>
              <Icon className="login-signup-button-icon">send</Icon>
            </Button>

          </form>

        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
