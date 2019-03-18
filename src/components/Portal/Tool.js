import React, { Component } from 'react';
import {
  Icon,
  Section,
  Row,
  Col,
  Button
} from 'react-materialize';
import '../../assets/css/portal.css';
import ToolDatasources from './ToolDatasources';
import ToolInfo from './ToolInfo';
import {
  OPEN_TOOL_REPORT
} from '../../constants/actionTypes';
import { connect } from 'react-redux';

const FeedbackButton = (props) => {
  if (props.activeSurveys > 0) {
    return (
      <Button onClick={props.onClick} className="portal-buttons" waves='light'>
        Submit Feedback
        <Icon right tiny className="data">assignment</Icon>
      </Button>);
  }
  return null;
};

const ViewReportButton = (props) => {
  if (props.activeSurveys > 0 ) {
    return (
      <Button onClick={props.onClick} className="portal-buttons" waves='light'>
        View Report
        <Icon right tiny className="data">group</Icon>
      </Button>);
  }
  return null;
};

const mapStateToProps = state => ({
  ...state.portal
});
const mapDispatchToProps = dispatch => ({
  triggerToolReport: (tool) => {
    dispatch({
      type: OPEN_TOOL_REPORT,
      tool: tool
    });
  }
});

class Tool extends Component {
  constructor(props) {
    super(props);
    this.onClickFeedback = this.onClickFeedback.bind(this);
  }

  onClickFeedback = () => {
    this.props.handler(this.props.tool);
  };
  onClickViewReport = () => {
    this.props.triggerToolReport(this.props.tool);
  };

  render() {
    const tool = this.props.tool;
    return (
      <Section key={tool.tool_name} className="portal-body-wrapper valign-wrapper">
        <Row className='tool-wrapper'>

          <Col s={2} className='valign-wrapper'>
            <h6 className="tool-name">{tool.tool_name}</h6>
          </Col>
          <Col className="tool-description" s={6}>
            {tool.description}
          </Col>
          <Col s={4} className="center">
            <Row>
              <ToolInfo tool={tool}/>
            </Row>
            <Row>
              <ToolDatasources tool={tool}/>
            </Row>
            <Row>
              <FeedbackButton activeSurveys={tool.activeSurveys} onClick={this.onClickFeedback}/>
            </Row>
            <Row>
              <ViewReportButton activeSurveys={tool.activeSurveys} onClick={this.onClickViewReport}/>
            </Row>
          </Col>
        </Row>
      </Section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tool);
