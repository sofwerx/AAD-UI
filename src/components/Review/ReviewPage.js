import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/css/portal.css';
import { REVIEW_FORM_LOADED, REVIEW_FORM_UNLOADED } from '../../constants/actionTypes';
import agent from '../../agent';
import SubHeader from '../Common/SubHeader';
import Survey from './Survey/Survey';

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

  loadSurvey = props => {
    if (!props.survey) {
      return (
        <div>Loading...</div>
      );
    }
    else {
      return (
        <Survey survey={props.survey} />
      )
    }
  };

  render() {
    return (
      <div className="">
        <div>
          <SubHeader icon={require('../../assets/images/assessment_icon.png')}
                     subHeader="Write an Assessment"/>
          {
            this.loadSurvey(this.props)
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
