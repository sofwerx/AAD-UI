import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkCookie } from '../../actions/checkCookie'
import { Icon, Section, Row, Col } from 'react-materialize'
import { Link } from 'react-router-dom'


class Dashboard extends Component {
  componentWillMount(){
    // setTimeout(() => {this.props.checkCookie()},500)
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
                <Icon className="orange-icon" right={true} medium>account_circle</Icon>
              </Col>
              <Col s={1}>
                <h5 className="dash-username">{this.props.username}</h5>
              </Col>
              <Col s={10}></Col>
            </Row>
            <Row>
              <Col s={12}>
                <hr className="thick-line-blue" />
              </Col>
            </Row>
          </Section>

          <Section id="dash-body-wrapper valign-wrapper">
            <Row s={12} className='center valign-wrapper'>
              <Col s={3}></Col>
              <Col className='center' s={3}>
                <Link to="/reviews">
                  <Icon className="orange-icon" large>assignment</Icon>
                  <div>Tool Assessments</div>
                  <hr className="thick-line-blue width40Per"/>
                </Link> 
              </Col>
              <Col className='center' s={3}>
                <Link to="/portal">
                  <Icon className="orange-icon" large>touch_app</Icon>
                  <div>Launch Portal</div>
                  <hr className="thick-line-blue width40Per"/>
                </Link>
              </Col>
              <Col s={3}></Col>
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
