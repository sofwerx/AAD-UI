import React, { Component } from 'react';
import '../../../../assets/css/answer.css';

const PropTypes = require('prop-types');

class Answer extends Component {
  render() {
    const answer = this.props.answer;
    if (answer) {
      return (
        <div className={'answer answer_generic'}>

            <div className={'answer-hd'}>
              {answer.question_text}
            </div>
            <div className={'answer-bd'}>
              {answer.answer_text}
            </div>
        </div>
      );
    }
    return null;
  }
}

Answer.propTypes = {
  answer: PropTypes.object
};

export default Answer;

