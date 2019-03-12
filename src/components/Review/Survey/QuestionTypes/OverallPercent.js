import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import '../../../../assets/css/questionTypes.css';

const PropTypes = require('prop-types');


class OverallPercent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.updateRangeValue = this.updateRangeValue.bind(this);

    this.parentOnChange = this.props.onChange;

    this.state = {
      rangeValue: 50
    };
    this.propagateState(props.question.id, this.state.rangeValue);
  }

  onChange = (e) => {
    if (this.parentOnChange) this.parentOnChange(e);
  };

  onBlur = (e) => {
    this.propagateState(this.props.question.id, this.state.rangeValue);
  };

  propagateState = (id, value) => {
    const inputState = {
      questionId: id,
      answerType: 'answer_numeric',
      value: value,
      hasValidValue: true
    };
    if (this.parentOnChange) this.parentOnChange(inputState, null);
  };

  updateRangeValue = (e) => {
    this.setState({ rangeValue: Number.parseInt(e.target.value) });
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
                  onChange={this.updateRangeValue}
                  onBlur = {this.onBlur}
                  min="0" max="100"/>
              </p>
            </Col>
          </Row>
        </Col>
      );
    }
    return null;
  }
}

OverallPercent.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  question: PropTypes.object
};


export default OverallPercent;

