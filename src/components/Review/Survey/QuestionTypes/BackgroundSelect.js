import React, { Component } from 'react';
import { Row, Col, Input } from 'react-materialize';

import '../../../../assets/css/review.css';
import '../../../../assets/css/off.css';
import '../../../../assets/css/questionTypes.css';

const PropTypes = require('prop-types');

const AnswerOptions = props => {
  const answerOptions = props.answerOptions;
  let options = answerOptions.map((answerOption, index) =>
    <option key={index} value={answerOption.answer_option_value}>{answerOption.answer_option_value}</option>
  );
  return (
    <Input
      type='select'
      className="LikertScaleQuestionInput"
      onChange = {props.onChange}
      s={12}>
      {options}
    </Input>
  );
};

class BackgroundSelect extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.parentOnChange = this.props.onChange;
    this.parentOnBlur = this.props.onBlur;

    const defaultValue = props.question.answerOptions[0].answer_option_value;
    this.propagateState(this.props.question.id, defaultValue);
  }

  propagateState = (id, value) => {
    const inputState  = {
      questionId: id,
      answerType: 'answer_text',
      value: value,
      hasValidValue: true
    };
    if (this.parentOnChange) this.parentOnChange(inputState, null);
  };

  onChange = (e) => {
    this.propagateState(this.props.question.id, e.target.value);
  };

  onBlur = (e) => {
    if (this.parentOnBlur) this.parentOnBlur(e);
  };

  render() {
    const question = this.props.question;
    if (question) {
      return (
        <Col l={5} s={12} className="question question_backgroundSelect">
          <Row className="questionBody valign-wrapper edit-results-item">
            <Col s={1} className="hide-on-med-and-up">
              <span className="questionText">
                  {question.question_order}
              </span>
            </Col>
            <Col s={7} l={6}>
              <span className="questionText">{question.question_text}</span>
            </Col>
            <Col s={4} l={7}>
              <AnswerOptions answerOptions={question.answerOptions} onChange = {this.onChange}/>
            </Col>
          </Row>
        </Col>
      );
    }
    return null;
  }
}

BackgroundSelect.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  question: PropTypes.object
};

AnswerOptions.propTypes = {
  answerOptions: PropTypes.array,
  onChange: PropTypes.func
};

export default BackgroundSelect;

