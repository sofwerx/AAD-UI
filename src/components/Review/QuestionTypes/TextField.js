import React, { Component } from 'react';
import { Row, Col, Collapsible, CollapsibleItem, Input } from 'react-materialize';

import '../../../assets/css/questionTypes.css';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.parentOnChange = this.props.onChange;
    this.parentOnBlur = this.props.onBlur;

    this.state = {};
  }

  onChange = (e) => {
    if (this.parentOnChange) this.parentOnChange(e);
  };

  onBlur = (e) => {
    if (this.parentOnBlur) this.parentOnBlur(e);
  };

  render() {
    const question = this.props.question;
    if (question) {
      return (
        <Col s={12} className="question question_textField">
          <Row>
            <Collapsible default defaultActiveKey={2}>
              <CollapsibleItem className="questionText" header={question.question_text} icon="add">
                <Row className="valign-wrapper">
                  <Col s={12}>
                    <Input
                      s={12}
                      className="text-align-center"
                      type='textarea'
                      placeholder={question.question_subtext}/>
                  </Col>
                </Row>
              </CollapsibleItem>
            </Collapsible>
          </Row>
        </Col>
      );
    }
    return null;
  };
}

export default TextField;

