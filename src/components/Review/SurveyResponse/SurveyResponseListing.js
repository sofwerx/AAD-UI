import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';

import '../../../assets/css/review.css';
import '../../../assets/css/off.css';
import '../../../assets/css/surveyResponse.css';
import SurveyResponseDetails from './SurveyResponseDetails';
import SurveyResponseHeader from './SurveyResponseHeader';

const PropTypes = require('prop-types');

class SurveyResponseListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  render() {
    const surveyResponse = this.props.surveyResponse;
    if (surveyResponse) {
      return (
        <Row>
          <Col s={12} className="surveyResponseListing">
            <Row
              className="surveyResponseListing-hd valign-wrapper min-width-100 edit-results-item">
              <SurveyResponseHeader
                index={this.props.index}
                surveyResponse={surveyResponse}
                handleToggle={this.handleToggle.bind(this)}/>
            </Row>
            <div className={'surveyResponseListing-bd ' + (this.state.collapsed ? 'collapsed' : '')}>
              <SurveyResponseDetails
                surveyResponse={surveyResponse}
              />
            </div>
          </Col>
        </Row>
      );
    }
    return null;
  }

  handleToggle = () => {
    this.setState({
        collapsed: !this.state.collapsed
      });
  };
}


SurveyResponseListing.propTypes = {
  index: PropTypes.number,
  surveyResponse: PropTypes.object
};

export default SurveyResponseListing;

