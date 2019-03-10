import React, { Component } from 'react';
import { Input } from 'react-materialize';
import validator from 'email-validator';
const PropTypes = require('prop-types');

class EmailInput extends Component {
  constructor(props) {
    super(props);
    this.validateValue = this.validateValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.parentOnChange = this.props.onChange;
    this.parentOnBlur = this.props.onBlur;

    this.state = {value: this.props.value};
  }

  onChange = (e) => {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        value: value
      })
    );
    if (this.parentOnChange) this.parentOnChange(e);
  };

  onBlur = (e) => {
    this.validateValue(e);
    if (this.parentOnBlur) this.parentOnBlur(e);
  };

  validateValue = (e) => {
    const isValidEmail = validator.validate(e.target.value);
    const hasWarning = (e.target.value.length === 0 || !isValidEmail);
    this.setState(
      prevState => ({
        ...prevState,
        validationWarning: hasWarning ? 'Please enter a valid email address.' : null
      })
    );
    e.target.hasValidValue = !hasWarning;
  };

  render() {
    return (
      <div className="form-group">
        <Input
          required
          type={'email'}
          id={'input-' + (this.props.name || 'email')}
          className={'signup-input'}
          name={(this.props.name || 'email')}
          label={<span>{'Email'}</span>}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          s={12}
        />
        {
          this.state.validationWarning ?
            <div className="error-text">
              {this.state.validationWarning}
            </div>
            : null}
      </div>
    );
  }
}

EmailInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default EmailInput;
