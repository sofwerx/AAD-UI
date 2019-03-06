import React from 'react';
import { Modal, Button, Icon, Collection, CollectionItem } from 'react-materialize';

const ToolDatasources = (props) => {
  const getDatasources = toolDetails => {
    let dataSourceList = undefined;
    if (toolDetails) {
      toolDetails.forEach((toolDetail) => {
        if (toolDetail.detail_key === 'tool_dataSources') {
          dataSourceList = toolDetail.detail_value;
        }
      });
    }
    return dataSourceList;
  };

  const tool = props.tool;
  let dataSourceList = getDatasources(tool.toolDetails);
  if (dataSourceList) {
    const datasourceArray = dataSourceList.replace(/ /g, '')
      .split(',');
    return (
      <Modal
        className="full-page"
        header={`${tool.tool_name} Data Sources`}
        bottomSheet
        trigger={
          <Button className="portal-buttons" waves='light'>
            Data
            <Icon right tiny className="data">cloud</Icon>
          </Button>}>
        <Collection>
          {
            datasourceArray.map(dataSet => {
              return (<CollectionItem>{dataSet}</CollectionItem>);
            })
          }
        </Collection>
      </Modal>
    );
  }
  return null;
};

export default ToolDatasources;
