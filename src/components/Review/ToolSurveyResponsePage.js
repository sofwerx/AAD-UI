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
import SurveyResponseListing from './SurveyResponse/SurveyResponseListing';
import SurveyResponseTableHeader from './SurveyResponse/SurveyResponseTableHeader';

const PropTypes = require('prop-types');

const mapStateToProps = state => ({
  ...state.review,
  currentUser: state.common.currentUser
});
const mapDispatchToProps = dispatch => ({
  onLoad: (toolId) =>
    dispatch({
      type: MY_REVIEWS_LOADED,
      payload: agent.tools.getSurveyResponses(toolId)
    }),
  onUnload: () =>
    dispatch({ type: MY_REVIEWS_UNLOADED })
});

class ToolSurveyResponsePage extends Component {
  constructor(props) {
    super(props);
    this.props.onLoad(this.props.match.params.tool_id);
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
      return (
        <div>
          {props.surveyResponses.map((surveyResponse, index) => {
            return (
              <SurveyResponseListing key={index} index={index} surveyResponse={surveyResponse}/>);
          })
          }
        </div>);
    }
  };

  render() {
    const toolName = this.props.match.params.slug;
    const readableToolName = toolName.replace(/-/g, " ");
    return (
      <div className="">
        <div>
          <SubHeader icon={require('../../assets/images/assessment_icon.png')}
                     subHeader={readableToolName}/>
          <Section className="reviews-wrapper center">
            <Row className="surveyResponses-wrapper">
              <SurveyResponseTableHeader/>
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

ToolSurveyResponsePage.propTypes = {
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  currentUser: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolSurveyResponsePage);
