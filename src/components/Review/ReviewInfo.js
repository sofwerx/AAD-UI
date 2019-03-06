import React from 'react';
import { Col } from 'react-materialize';

const ReviewInfo = (props) => {
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

export default ReviewInfo;
