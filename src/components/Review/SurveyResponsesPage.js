import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Section } from 'react-materialize';
import '../../assets/css/portal.css';
import {
  MY_REVIEWS_LOADED,
  MY_REVIEWS_UNLOADED
} from '../../constants/actionTypes';
import agent from '../../agent';
import SubHeader from '../Common/SubHeader';
import SurveyResponse from './SurveyResponse/SurveyResponse';
import SurveyResponseHeader from './SurveyResponse/SurveyResponseHeader';
const PropTypes = require('prop-types');



const mapStateToProps = state => ({
  ...state.review,
  currentUser: state.common.currentUser
});
const mapDispatchToProps = dispatch => ({
  onLoad: (userId) =>
    dispatch({
      type: MY_REVIEWS_LOADED,
      payload: agent.users.getSurveyResponses(userId)
    }),
  onUnload: () =>
    dispatch({ type: MY_REVIEWS_UNLOADED })
});

class SurveyResponsesPage extends Component {
  constructor(props) {
    super(props);
    this.props.onLoad(this.props.currentUser.id);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  loadSurveyResponses = props => {
    if (!props.surveyResponses || props.surveyResponses.length === 0) {
      return (
        <div>NO SUBMITTED FEEDBACK</div>
      );
    }
    else {
      return props.surveyResponses.map((surveyResponse, index) => {
        return (
          <SurveyResponse key={index} index={index} surveyResponse={surveyResponse}/>

        );
      });
    }
  };

  render() {
    return (
      <div className="">
        <div>
          <SubHeader icon={require('../../assets/images/assessment_icon.png')}
                     subHeader="Submitted Feedback"/>
          <Section className="reviews-wrapper center">
            <Row className="surveyResponses-wrapper">
              <SurveyResponseHeader/>
              {
                this.loadSurveyResponses(this.props)
              }
            </Row>
          </Section>
        </div>
      </div>
    );
  }
}

SurveyResponsesPage.propTypes = {
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  currentUser: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyResponsesPage);
