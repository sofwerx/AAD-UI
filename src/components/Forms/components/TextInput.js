import React, { Component } from 'react';
import { Input } from 'react-materialize';
const PropTypes = require('prop-types');

class TextInput extends Component {
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
    if (this.parentOnChange) this.parentOnChange(e);
  };

  onBlur = (e) => {
    this.validateValue(e);
    if (this.parentOnBlur) this.parentOnBlur(e);
  };

  validateValue = (e) => {
    const hasWarning = (e.target.value.length === 0);
    this.setState(
      prevState => ({
        ...prevState,
        validationWarning: hasWarning ? 'Please enter a value.' : null
      })
    );
    e.target.hasValidValue = !hasWarning;
  };

  render() {
    return (
      <div className="form-group">
        <Input
          required
          type={'text'}
          id={'input-' + this.props.name}
          className={'signup-input'}
          name={this.props.name}
          value={this.props.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          label={<span>{this.props.label}</span>}
          s={12}
        />
        {this.state.validationWarning ?
          <div className="error-text">
            {this.state.validationWarning}
          </div> : null}
      </div>
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default TextInput;

