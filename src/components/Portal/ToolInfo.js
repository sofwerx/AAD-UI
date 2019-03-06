import React from 'react';
import { Modal, Button, Icon, Row, Col } from 'react-materialize';

const ToolInfo = (props) => {
  const getDatasources = toolDetails => {
    let toolDetailList = {};
    if (toolDetails) {
      toolDetails.forEach((toolDetail) => {
        toolDetailList[toolDetail.detail_key] = toolDetail.detail_value;
      });
    }
    return toolDetailList;
  };

  const tool = props.tool;
  let dataSourceList = getDatasources(tool.toolDetails);
  if (dataSourceList.tool_url) {
    return (
      <Modal
        header={tool.tool_name + ' Information'}
        trigger={
          <Button className="portal-buttons" waves='light'>
            Open
            <Icon right tiny className="data">touch_app</Icon>
          </Button>}>
        <Row className="margin-top valign-wrapper">
          <Col s={6}>
            <div className="border-bottom">
              Username:
              <span className="bold">
                {(dataSourceList.tool_name) ? dataSourceList.tool_name : 'N/A'}
              </span>
            </div>
            <div className="border-bottom">
              Password:
              <span className="bold">
                {(dataSourceList.tool_password) ? dataSourceList.tool_password : 'N/A'}
              </span>
            </div>
          </Col>
          <Col s={6}>
            <Button
              className="portal-buttons modal-close"
              waves='light'
              node='a'
              target="_blank"
              href={dataSourceList.tool_url}>
              Open
              <Icon right tiny className="data">touch_app</Icon></Button>
          </Col>
        </Row>
      </Modal>
    );
  }
  return null;
};

export default ToolInfo;
