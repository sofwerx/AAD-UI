import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';

import '../../../assets/css/review.css';
import '../../../assets/css/off.css';

class SurveyResponseTableHeader extends Component {

  render() {
      return (
        <Col s={12} className="surveyResponse surveyResponse_header">
          <Row className="surveyResponseBody valign-wrapper min-width-100 edit-results-item">
            <Col className="surveyResponseField surveyResponseField_index" s={1}>
              <span>#</span>
            </Col>
            <Col s={2}>
              <span className="surveyResponseField">
                CREATED ON
              </span>
            </Col>
            <Col s={1}>
              <span className={'surveyResponseField'}>
                PUBLIC
              </span>
            </Col>
            <Col s={2} className={'surveyResponseField'}>
              <span className="questionText">
                  TOOL NAME
              </span>
            </Col>
            <Col s={2} className={'surveyResponseField'}>
              <span className="questionText">
                  SURVEY NAME
              </span>
            </Col>
            <Col s={4} className ="surveyResponseField surveyResponseField_delete"> </Col>
          </Row>
        </Col>
      );
  }
}

export default SurveyResponseTableHeader;
