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
  console.log(options);
  return (
    <Input
      className="LikertScaleQuestionInput"
      defaultValue={2}
      s={12}
      type='select'>
      {options}
    </Input>
  );
};

class LikertScale extends Component {
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
        <Col s={12} className="question question_likertScale">
          <Row className="questionBody valign-wrapper min-width-100 edit-results-item">
            <Col s={1}>
              <span className="questionText">
                  {question.question_order}
              </span>
            </Col>
            <Col s={7}>
              <span className="questionText">{question.question_text}</span>
            </Col>
            <Col s={4}>
              <AnswerOptions answerOptions={question.answerOptions}/>
            </Col>
          </Row>
        </Col>
      );
    }
    return null;
  };
}

export default LikertScale;

