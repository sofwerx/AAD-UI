import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { Icon, Section, Row, Col } from 'react-materialize'
import { Link } from 'react-router-dom'


class Dashboard extends Component {
  componentWillMount(){
    this.props.checkCookie()
  }

  render() {
      return (
        <div>
          {/* HEADER */}
          <Section className="dash-heading-wrapper">
            <Row> 
              <Col s={12}>
              </Col>
            </Row>
            <Row className='center valign-wrapper'>
              <Col s={1}>
              <img src={require("../../assets/person_icon.png")}  width="50px" />
              </Col>
              <Col s={1}>
                <h5 className="dash-username">{this.props.username}</h5>
              </Col>
              <Col s={10}></Col>
            </Row>
            <Row>
              <Col s={12}>
                <hr className="thin" />
              </Col>
            </Row>
          </Section>

          <Section id="dash-body-wrapper valign-wrapper">
            <Row s={12} className='center valign-wrapper dash-row-wrapper'>
              {/* <Col s={2}></Col> */}
              <Col className='center border-right-bottom tool-wrapper' s={6}>
                  <Link  to="/reviews">
                    <div className="dashboard-block-wrapper">
                      <img src={require("../../assets/assessment_icon.png")} width="100px" />
                      <div>ASSESSMENTS</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      Come here to post reviews on all the tools you have used. You'll have the opportunity to upload files and leave some custom comments.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
              <Col className='center border-left-bottom tool-wrapper' s={6}>
                  <Link  to="/portal">
                    <div className="dashboard-block-wrapper">
                      <img src={require("../../assets/launch_icon.png")} width="100px" />
                      <div>PORTAL</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      All tools available will be found here. Take a look and see which ones are the most useful.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
              {/* <Col s={2}></Col> */}
            </Row>
            <Row><Col s={12}></Col></Row>
          </Section>

        </div>
      )
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
