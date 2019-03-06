import React from 'react';
import '../../assets/css/dashboard.css';

import { Section, Row, Col } from 'react-materialize';
import DashboardItem from './DashboardItem';

const DashboardPage = (props) => {
  return (
    <div className="dash-outter-wrapper">
      <Section id="dash-body-wrapper ">
        <Row className=' center-align dash-row-wrapper'>
          <Col className='tool-wrapper hover-lighten offset-l2' s={12} l={8}>
            <DashboardItem
              to={'/portal'}
              iconLoc={require('../../assets/images/launch_icon.png')}
              title={'Portal'}
              description={' View and test all tools available from here.'}
            />
          </Col>
          <Col className='tool-wrapper hover-lighten offset-l2' s={12} l={8}>
            <DashboardItem
              to={'/statistics'}
              iconLoc={require('../../assets/images/stats_icon.png')}
              title={'The Stats'}
              description={'Statistically displaying how tools are measuring up.'}
            />
          </Col>
          {/*<Col className='tool-wrapper hover-lighten offset-l2' s={12} l={8}>*/}
          {/*<DashboardItem*/}
          {/*to = {'/reviews'}*/}
          {/*iconLoc = {require("../../assets/images/assessment_icon.png")}*/}
          {/*title = {'My Assessments'}*/}
          {/*description = {'Post public or private reviews on all the tools you have used.'}*/}
          {/*/>*/}
          {/*</Col>*/}
          <Col className='tool-wrapper hover-lighten offset-l2' s={12} l={8}>
            <DashboardItem
              to={'/public'}
              iconLoc={require('../../assets/images/lightbulb_icon.png')}
              title={'Public Reviews'}
              description={'See what other people are saying about the tools available.'}
            />
          </Col>
        </Row>
      </Section>
    </div>
  );
};

export default DashboardPage;
