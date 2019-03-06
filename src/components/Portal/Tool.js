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

class Tool extends Component {
  constructor(props) {
    super(props);
    this.asd = this.asd.bind(this);
  }

  asd = () => {
    this.props.handler(this.props.tool);
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
              <FeedbackButton activeSurveys={tool.activeSurveys} onClick={this.asd}/>
            </Row>
          </Col>
        </Row>
      </Section>
    );
  };
}

export default Tool;
