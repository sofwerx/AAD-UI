import React, { Component } from 'react';
import { Input } from 'react-materialize';

import validator from 'email-validator';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.emailValidator = this.emailValidator.bind(this);
    this.passwordValidator = this.passwordValidator.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.parentOnChange = this.props.onChange;
    this.parentOnBlur = this.props.onBlur;

    this.state = {};
  }

  onChange = (e) => {
    if (this.parentOnChange) this.parentOnChange(e);
  };

  onBlur = (e) => {
    if (this.props.type === 'email') this.emailValidator(e);
    if (this.props.type === 'password') this.passwordValidator(e);
    if (this.parentOnBlur) this.parentOnBlur(e);
  };

  emailValidator = (e) => {
    const notValid = !validator.validate(e.target.value);
    this.setState({
      ...this.state,
      validEmailWarning: notValid ? 'Must be a valid email.' : null
    });
    e.target.notValid = e.target.notValid || notValid;
  };

  passwordValidator = (e) => {
    const hasWarning = (e.target.value.length < 8 || e.target.value.length > 30);
    this.setState({
      ...this.state,
      lengthWarning: hasWarning ? 'Must be between 8 and 30 characters.' : null
    });
    e.target.notValid = e.target.notValid || hasWarning;
  };

  render() {
    return (
      <div className="form-group">
        <Input
          defaultValue={null}
          className={'signup-input'}
          id={'input-' + this.props.name}
          name={this.props.name}
          type={this.props.type}
          value={this.props.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder={this.props.placeholder}
          label={<span>{this.props.label}</span>}
          s={this.props.s}
        />
        {this.state.validEmailWarning ?
          <div className="error-text">{this.state.validEmailWarning}</div> : null}
        {this.state.lengthWarning ?
          <div className="error-text">{this.state.lengthWarning}</div> : null}
      </div>
    );
  };
}

export default TextInput;

