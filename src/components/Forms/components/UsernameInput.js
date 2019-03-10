import React, { Component } from 'react';
import { Input } from 'react-materialize';
const PropTypes = require('prop-types');

class UsernameInput extends Component {
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
        lengthWarning: hasWarning ? 'Please enter a valid username.' : null
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
          id={'input-' + (this.props.name || 'username')}
          className={'signup-input'}
          name={(this.props.name || 'username')}
          label={<span>{'Username'}</span>}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          s={12}
        />
        {
          this.state.lengthWarning ?
            <div className="error-text">
              {this.state.lengthWarning}
            </div>
            : null}
      </div>
    );
  }
}

UsernameInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default UsernameInput;
