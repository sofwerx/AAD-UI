import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Stats.css';
import { bindActionCreators } from 'redux'
import { authenticate } from '../../actions/authenticate'
import { getAnswers } from '../../actions/getAnswers'
import { setPermissions } from '../../actions/setPermissions'
import { getUserInfo } from '../../actions/getUserInfo'
import { Row, Input, Col, ProgressBar } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import SubHeader from '../SubHeader/SubHeader'
import Chart from '../Chart/Chart'


class Stats extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedToolResults: "MEADE/SORT-OE", 
      allAnswers: this.props.allAnswers,
      intTypes: ["SIGINT", "GEOINT", "HUMINT", "TECHINT", "CYBINT/DNINT", "MASINT", "FININT", "OSINT"],
      intTypesIncluded: ["SIGINT", "GEOINT", "HUMINT", "TECHINT", "CYBINT/DNINT", "MASINT", "FININT", "OSINT"]
    }
  }

  updateInputValue(evt, inputType, intType) {
    if (inputType == 'intTypesIncluded') {
        let found = this.state.intTypesIncluded.includes(intType)
        if (found) {
            return this.setState({ 
            intTypesIncluded: this.state.intTypesIncluded.filter(x => x !== intType)
            })
        } else {
            return this.setState({ 
            intTypesIncluded: [ ...this.state.intTypesIncluded, intType ]
            })
        }
    }
  }

  componentWillMount(){
    this.props.authenticate()
    this.props.getUserInfo().then(r => this.props.setPermissions(r.payload.role)) 
    this.props.getAnswers(this.state.selectedToolResults, this.props.OFFquestions)
  }

  render() {
    if(!this.props.username){
      return <Redirect to="/" />
    } else {
      return (
        <div>
          {/* HEADER */}
          <Row className="valign-wrapper"> 
            <Col s={9}>
              <SubHeader icon={require("../../assets/stats_icon.png")} subHeader="The Stats"/>
            </Col>
            <Col s={3} className="margin-right">
              <Input s={12} type='select' onChange={evt => this.setState({selectedToolResults: evt.target.value}, () => this.props.getAnswers(evt.target.value))} label="Choose Tool Results" >
                <option value='MEADE/SORT-OE'> MEADE/SORT-OE</option>
                <option value='ARGUMENT MAPPER'> ARGUMENT MAPPER</option>
              </Input>
            </Col>
          </Row> 
          <Row>
            <Row className="fixed">
              {
                this.state.intTypes.map((intType, i) => (
                  <Input
                  onChange={e => this.updateInputValue(e, 'intTypesIncluded', intType)} 
                  key={i}
                  name='Intelligence Discipline Filter'
                  type='checkbox'
                  value={intType}
                  checked={this.state.intTypesIncluded.includes(intType)}
                  label={intType} />
                ))
              }
            </Row>
            { 
              !this.props.getAnswersComplete ?
              <Row className="margin-top">
                <Col s={4}></Col>
                <Col s={4}>
                    <ProgressBar /> 
                </Col>
                <Col s={4}></Col>
              </Row>
              :
                !this.props.allAnswers || Object.keys(this.props.allAnswers).length < 1 || this.state.selectedToolResults !== "MEADE/SORT-OE" ?
                  <Row>
                    <Col s={3}></Col>
                    <Col s={6}>
                      <h5 className="font-300">No {this.state.selectedToolResults} Statistics Available Yet.</h5>
                    </Col>
                    <Col s={3}></Col>
                  </Row> 
                  :
                  Object.keys(this.props.allAnswers).map((answerObjectKey, i) => (
                    <Row key={i} className="height-100">
                      <Col>
                       <h6 className="uppercase-letter-spacing">{this.props.OFFquestions[i].questionID}. {this.props.OFFquestions[i].question}</h6>
                      </Col>
                       <Chart includedInts={this.state.intTypesIncluded} answerObject={this.props.allAnswers[answerObjectKey]}/>
                    </Row>
                  )) 
              }
          </Row>
        </div>
      )
    }
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
      allTools: state.tools.allTools, 
      role: state.auth.role,
      OFFquestions: state.reviews.OFFquestions, 
      allAnswers: state.reviews.allAnswers, 
      getAnswersComplete: state.reviews.getAnswersComplete,
      selectedStatsToolResults: state.reviews.selectedStatsToolResults
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({authenticate, getUserInfo, setPermissions, getAnswers}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Stats)