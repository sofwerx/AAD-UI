import React, { Component } from 'react';
import '../../../../assets/css/answer.css';

const PropTypes = require('prop-types');

class TextFieldAnswer extends Component {
  render() {
    const answer = this.props.answer;
    if (answer) {
      return (
        <div className={"answer answer_textFieldAnswer"}>
          <div className={"answer-hd"}>
            {answer.question_text}
          </div>
          <div className={"answer-bd"}>
            {answer.answer_text}
          </div>
        </div>
      );
    }
    return null;
  }
}

TextFieldAnswer.propTypes = {
  answer: PropTypes.object
};

export default TextFieldAnswer;
