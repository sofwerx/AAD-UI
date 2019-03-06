import React, { Component } from 'react';
import { Input } from 'react-materialize';


class UsernameInput extends Component {
  constructor(props) {
    super(props);
    this.usernameValidator = this.usernameValidator.bind(this);
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
    this.usernameValidator(e);
    if (this.parentOnBlur) this.parentOnBlur(e);
  };

  usernameValidator = (e) => {
    const hasWarning = (e.target.value.length < 8 || e.target.value.length > 30);
    this.setState({
      ...this.state,
      lengthWarning: hasWarning ? 'Must be between 8 and 30 characters.' : null
    });
    e.target.notValid = hasWarning;
  };

  render() {
    return (
      <div className="form-group">
        <Input
          required
          className={'signup-input'}
          id={'input-' + this.props.name}
          name={this.props.name}
          type={'text'}
          value={this.props.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder={this.props.placeholder}
          label={<span>{'Username'}</span>}
          s={this.props.s}
        />
        {
          this.state.lengthWarning ?
          <div className="error-text">
            {this.state.lengthWarning}
          </div>
            : null}
      </div>
    );
  };
}
export default UsernameInput;

