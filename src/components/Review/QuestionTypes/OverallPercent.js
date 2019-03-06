import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';

import '../../../assets/css/questionTypes.css';

class OverallPercent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.updateRangeValue = this.updateRangeValue.bind(this);

    this.parentOnChange = this.props.onChange;
    this.parentOnBlur = this.props.onBlur;

    this.state = {
      rangeValue: 50
    };
  }

  onChange = (e) => {
    if (this.parentOnChange) this.parentOnChange(e);
  };

  onBlur = (e) => {
    if (this.parentOnBlur) this.parentOnBlur(e);
  };

  updateRangeValue = (e) => {
    this.setState({ rangeValue: e.target.value });
  };

  render() {
    const question = this.props.question;
    if (question) {
      return (
        <Col s={12} className="question question_overallPercent">
          <Row className="valign-wrapper">
            <Col className="overallPercentLabel" s={6}>
              <span className="questionText">{question.question_text}</span>
              <span className="questionText"> {this.state.rangeValue}% </span>
              <p className="overallPercentBody range-field">
                <input
                  type="range"
                  value={this.state.rangeValue}
                  defaultValue={50}
                  onChange={this.updateRangeValue}
                  min="0" max="100"/>
              </p>
            </Col>
          </Row>
        </Col>
      );
    }
    return null;
  };
}

export default OverallPercent;

