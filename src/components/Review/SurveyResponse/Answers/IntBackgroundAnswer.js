import React, { Component } from 'react';
import '../../../../assets/css/answer.css';

const PropTypes = require('prop-types');

class IntBackgroundAnswer extends Component {
  render() {
    const answer = this.props.answer;
    if (answer) {
      return (
        <div className={"answer answer_intBackground"}>
          <div className={"answer-hd"}>
            SELECTED BACKGROUND
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

IntBackgroundAnswer.propTypes = {
  answer: PropTypes.object
};

export default IntBackgroundAnswer;

