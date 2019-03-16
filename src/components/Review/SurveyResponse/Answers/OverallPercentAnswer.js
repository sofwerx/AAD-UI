import React, { Component } from 'react';
import '../../../../assets/css/questionTypes.css';

const PropTypes = require('prop-types');


class OverallPercentAnswer extends Component {
  render() {
    const answer = this.props.answer;
    if (answer) {
      return (
        <div className={"answer answer_overallPercent"}>
          <div className={"answer-hd"}>
            OVERALL RATING
          </div>
          <div className={"answer-bd"}>
            {answer.answer_numeric} %
          </div>
        </div>
      );
    }
    return null;
  }
}

OverallPercentAnswer.propTypes = {
  answer: PropTypes.object
};

export default OverallPercentAnswer;

