import React, { Component } from 'react';
import { Col, Row } from 'react-materialize';

import OverallPercentAnswer from './Answers/OverallPercentAnswer';
import IntBackgroundAnswer from './Answers/IntBackgroundAnswer';
import TextFieldAnswer from './Answers/TextFieldAnswer';
import Answer from './Answers/Answer';

const PropTypes = require('prop-types');

class SurveyResponseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.answers = props.surveyResponse.answers;
    this.intBackgroundAnswers = [];
    this.overallAnswers = [];
    this.textFieldAnswers = [];
    this.otherAnswers = [];

    this.answers.forEach(answer => {
      switch (answer.question_type) {
        case 'int_background_select':
          this.intBackgroundAnswers.push(answer);
          break;
        case 'overall_percent':
          this.overallAnswers.push(answer);
          break;
        case 'text_field':
          this.textFieldAnswers.push(answer);
          break;
        default:
          this.otherAnswers.push(answer);
          break;
      }
    });
  }

  render() {
    const surveyResponse = this.props.surveyResponse;
    if (surveyResponse.answers && surveyResponse.answers.length > 0) {
      return (
        <div className={'surveyResponseDetails'}>
          <Row className={"surveyResponseDetails-row"}>
            <Col s={12} l={2}>
              <IntBackgroundAnswer answer={this.intBackgroundAnswers[0]}/>
            </Col>
            <Col s={0} l={8}>

            </Col>
            <Col s={12} l={2}>
              <OverallPercentAnswer answer={this.overallAnswers[0]}/>
            </Col>
          </Row>
          <Row className={"surveyResponseDetails-row"}>
            {
              this.otherAnswers.map((genericAnswer, index) => {
                return(
                  <Col key={index}  s={12} l={6}>
                  <Answer key={index} answer={genericAnswer}/>
                  </Col>)
              })
            }
          </Row>
          <Row className={"surveyResponseDetails-row"}>
            {
              this.textFieldAnswers.map((textFieldAnswer, index) => {
                return (
                  <Col key={index}  s={12} l={12}>
                   <TextFieldAnswer answer={textFieldAnswer}/>
                </Col>)
                })
            }
          </Row>
        </div>
      );
    }
    return null;
  }
}

SurveyResponseDetails.propTypes = {
  index: PropTypes.number,
  surveyResponse: PropTypes.object
};

export default SurveyResponseDetails;
