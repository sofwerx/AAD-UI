import React, { Component } from 'react';
import { Input } from 'react-materialize';
const PropTypes = require('prop-types');

class PasswordInput extends Component {
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
    const hasWarning = (e.target.value.length < 6 || e.target.value.length > 30);
    this.setState(
      prevState => ({
        ...prevState,
        validationWarning: hasWarning ? 'Password must be between 6 and 30 characters.' : null
      })
    );
    e.target.hasValidValue = !hasWarning;
  };

  render() {
    return (
      <div className="form-group">
        <Input
          required
          type={'password'}
          id={'input-' + (this.props.name || 'password')}
          className={'signup-input'}
          name={(this.props.name || 'password')}
          label={<span>{(this.props.label || 'Password')}</span>}
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

PasswordInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default PasswordInput;
