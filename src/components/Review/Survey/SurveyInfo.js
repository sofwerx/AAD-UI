import React from 'react';
import { Col } from 'react-materialize';
const PropTypes = require('prop-types');


const SurveyInfo = (props) => {
  if (props.survey) {
    return (
      <Col l={7} s={12}>
        <Col s={12}>
          <span className="reviewHeader">
              {props.survey.survey_name}
          </span>
        </Col>
      </Col>
    );
  }
  return null;
};

SurveyInfo.propTypes = {
  survey: PropTypes.object
};

export default SurveyInfo;
