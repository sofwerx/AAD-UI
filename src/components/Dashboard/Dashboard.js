import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authenticate } from '../../actions/authenticate'
import { setPermissions  } from '../../actions/setPermissions'
import { getUserInfo } from '../../actions/getUserInfo'
import { Section, Row, Col } from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'


class Dashboard extends Component {
  componentWillMount(){
    this.props.authenticate().then(r => r).catch(err => err)
    this.props.getUserInfo().then(r => this.props.setPermissions(r.payload.role)).catch(err => err)
  }

  render() {
    if(!this.props.username) {
      return <Redirect to="/" />
    } else {
      return (
        <div className="dash-outter-wrapper">
          <Section id="dash-body-wrapper valign-wrapper">
            <Row s={12} className='center valign-wrapper dash-row-wrapper'>
              <Col className='valign-wrapper center tool-wrapper hover-lighten ' s={12} m={6}>
                  <Link  to="/portal">
                    <div className="dashboard-block-wrapper">
                      <img alt="icon" src={require("../../assets/launch_icon.png")} width="100px" />
                      <div className="j-title">Portal</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      View and test all tools available from here.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
              <Col className='valign-wrapper center  tool-wrapper hover-lighten border-bottom-and-left' s={12} m={6}>
                  <Link  to="/reviews">
                    <div className="dashboard-block-wrapper">
                      <img alt="icon" src={require("../../assets/assessment_icon.png")} width="100px" />
                      <div className="j-title">My Assessments</div>
                      <hr className="thin width40Per"/>
                      <p className="dashboard-description-text">
                      Post public or private reviews on all the tools you have used.
                      </p>
                      <hr className="thin width40Per"/>
                    </div>
                  </Link>
              </Col>
            </Row>

          </Section>

        </div>
      )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      role: state.auth.role
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({authenticate, getUserInfo, setPermissions}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
