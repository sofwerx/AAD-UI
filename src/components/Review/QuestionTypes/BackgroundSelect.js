import React, { Component } from 'react';
import { Row, Col, Input } from 'react-materialize';

import '../../../assets/css/review.css';
import '../../../assets/css/off.css';
import '../../../assets/css/questionTypes.css';

const AnswerOptions = props => {
  const answerOptions = props.answerOptions;
  let options = answerOptions.map((answerOption, index) =>
    <option value={index}>{answerOption.answer_option_value}</option>
  );
  return (
    <Input
      className="LikertScaleQuestionInput"
      defaultValue={0}
      s={12}
      type='select'>
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

    this.state = {};
  }

  onChange = (e) => {
    if (this.parentOnChange) this.parentOnChange(e);
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
              <AnswerOptions answerOptions={question.answerOptions}/>
            </Col>
          </Row>
        </Col>
      );
    }
    return null;
  };
}

export default BackgroundSelect;

