import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Section } from 'react-materialize';
import '../../assets/css/portal.css';
import { REVIEW_FORM_LOADED, REVIEW_FORM_UNLOADED } from '../../constants/actionTypes';
import agent from '../../agent';
import SubHeader from '../Common/SubHeader';
import LikertScale from './QuestionTypes/LikertScale';
import TextField from './QuestionTypes/TextField';
import OverallPercent from './QuestionTypes/OverallPercent';
import BackgroundSelect from './QuestionTypes/BackgroundSelect';
import ReviewInfo from './ReviewInfo';


const mapStateToProps = state => ({
  ...state.review
});
const mapDispatchToProps = dispatch => ({
  onLoad: (surveyId) =>
    dispatch({
      type: REVIEW_FORM_LOADED,
      payload: agent.surveys.get(surveyId)
    }),
  onUnload: () =>
    dispatch({ type: REVIEW_FORM_UNLOADED })
});

class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.props.onLoad(this.props.match.params.survey_id);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  loadQuestions = props => {
    if (!props.survey) {
      return (
        <div>Loading...</div>
      );
    }
    else {
      return props.survey.questions.map(question => {
        if (question.question_type === 'likert_scale') {
          return (<LikertScale question={question}/>);
        }
        else if (question.question_type === 'text_field') {
          return (<TextField question={question}/>);
        }
        else if (question.question_type === 'overall_percent') {
          return (<OverallPercent question={question}/>);
        }
        else if (question.question_type === 'int_background_select') {
          return (<BackgroundSelect question={question}/>);
        }
        return (
          <div>{question.question_text}</div>
        );
      });
    }
  };

  render() {
    return (
      <div className="">
        <div>
          <SubHeader icon={require('../../assets/images/assessment_icon.png')}
                     subHeader="Write an Assessment"/>
          <Section className="reviews-wrapper center">
            <Row className="questions-wrapper">
              <ReviewInfo survey={this.props.survey}/>
              {
                this.loadQuestions(this.props)
              }
            </Row>
            <Row className="valign-wrapper">
              <Col className="center" s={6}>
                <div>
                  <button className="btn waves-effect waves-light portal-buttons">
                    <i className="material-icons right data">send</i>Submit Review
                  </button>
                </div>
              </Col>
            </Row>
          </Section>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
