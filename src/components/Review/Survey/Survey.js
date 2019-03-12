import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Section } from 'react-materialize';
import agent from '../../../agent';
import { SURVEY_RESPONSE_SUBMITTED } from '../../../constants/actionTypes';

import '../../../assets/css/portal.css';
import LikertScale from './QuestionTypes/LikertScale';
import TextField from './QuestionTypes/TextField';
import OverallPercent from './QuestionTypes/OverallPercent';
import BackgroundSelect from './QuestionTypes/BackgroundSelect';
import SurveyInfo from './SurveyInfo';

const PropTypes = require('prop-types');

const mapStateToProps = state => ({
  ...state.review,
  currentUser: state.common.currentUser
});
const mapDispatchToProps = dispatch => ({
  onSubmit: (surveyResponse) => {
    const payload = agent.surveyResponses.post(surveyResponse);
    dispatch({ type: SURVEY_RESPONSE_SUBMITTED, payload });
  }
});

class Survey extends Component {
  constructor(props) {
    super(props);
    this.handleInputV2 = this.handleInputV2.bind(this);
    this.aggregateAnswers = this.aggregateAnswers.bind(this);

    //Setup initial state
    let initialState = {};
    props.survey.questions.forEach((question) => {
      initialState[question.id] = {
        answerType: '',
        hasValidValue: false
      };
    });
    this.state = initialState;

    this.submitForm = () => ev => {
      ev.preventDefault();
        let surveyResponse =
          {
            user_id: this.props.currentUser.id,
            survey_id: this.props.survey.id,
            is_public: false,
            answers: this.aggregateAnswers()
          };
        this.props.onSubmit(surveyResponse);
    };
  }

  aggregateAnswers = () => {
    let answers;
    const questions = this.props.survey.questions;
    answers = questions.map((question) => {
      return {
        question_id: question.id,
        [this.state[question.id].answerType]: this.state[question.id].value
      }
    });
    return answers;
  };

  handleInputV2 = (inputUpdate, e) => {
    this.setState(
      prevState => ({
        ...prevState,
        [inputUpdate.questionId]: {
        answerType: inputUpdate.answerType,
        value: inputUpdate.value,
        hasValidValue: inputUpdate.hasValidValue
        }
      })
    );
  };

  loadQuestions = props => {
    if (props.survey) {
      return props.survey.questions.map(question => {
        if (question.question_type === 'likert_scale') {
          return (<LikertScale key={question.id} question={question} onChange={this.handleInputV2}/>);
        }
        else if (question.question_type === 'text_field') {
          return (<TextField key={question.id} question={question} onChange={this.handleInputV2}/>);
        }
        else if (question.question_type === 'overall_percent') {
          return (<OverallPercent key={question.id} question={question} onChange={this.handleInputV2}/>);
        }
        else if (question.question_type === 'int_background_select') {
          return (<BackgroundSelect key={question.id} question={question} onChange={this.handleInputV2}/>);
        }
        return (
          <div key={question.id}>{question.question_text}</div>
        );
      });
    }
    return null;
  };

  render() {
    return (
      <Section className="reviews-wrapper center">
        <Row className="questions-wrapper">
          <SurveyInfo survey={this.props.survey}/>
          {
            this.loadQuestions(this.props)
          }
        </Row>
        <Row className="valign-wrapper">
          <Col className="center" s={6}>
            <div>
              <button onClick={this.submitForm()} className="btn waves-effect waves-light portal-buttons">
                <i className="material-icons right data">send</i>Submit Review
              </button>
            </div>
          </Col>
        </Row>
      </Section>
    );
  }
}

Survey.propTypes = {
  survey: PropTypes.object,
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
