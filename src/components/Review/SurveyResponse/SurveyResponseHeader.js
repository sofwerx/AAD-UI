import React, { Component } from 'react';
import { Row, Col, Icon } from 'react-materialize';

import '../../../assets/css/review.css';
import '../../../assets/css/off.css';
import '../../../assets/css/surveyResponse.css';

const PropTypes = require('prop-types');

class SurveyResponseHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.parentHandleToggle = this.props.handleToggle;
    this.handleToggle = this.handleToggle.bind(this);
  }

  render() {
    const surveyResponse = this.props.surveyResponse;
    const date = new Date(surveyResponse.created_at);
    if (surveyResponse) {
      return (
        <Row
          className="surveyResponseListing-hd valign-wrapper min-width-100 edit-results-item">
          <Col s={1} className={'surveyResponseField surveyResponseField_index'}>
              <span>
                {this.props.index + 1}
              </span>
          </Col>

          <Col s={2}>
              <span className="surveyResponseField">
                {new Intl.DateTimeFormat('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(date)}{' - '}
              </span>
            <span className="surveyResponseField">
                {new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit'
                }).format(date)}
              </span>
          </Col>
          <Col s={1}>
              <span className={'surveyResponseField'}>
                {surveyResponse.is_public ? <Icon>visibility</Icon> : ''}
              </span>
          </Col>
          <Col s={2} className={'surveyResponseField'}>
              <span className="questionText">
                  {surveyResponse.tool_name}
              </span>
          </Col>
          <Col s={2} className={'surveyResponseField'}>
              <span className="questionText">
                  {surveyResponse.survey_name}
              </span>
          </Col>
          <Col s={3} className={'surveyResponseField surveyResponseField_delete'}>
            {/*<Icon>delete</Icon>*/}
          </Col>
          <Col s={1}>
            <div
              className = {'surveyResponseField surveyResponseField_collapse ' + (this.state.collapsed ? 'collapsed' : '')}
              onClick = {this.handleToggle}
            />
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
    this.parentHandleToggle();
  };
}

SurveyResponseHeader.propTypes = {
  index: PropTypes.number,
  surveyResponse: PropTypes.object,
  handleToggle: PropTypes.func
};

export default SurveyResponseHeader;

