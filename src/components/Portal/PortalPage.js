import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/css/portal.css';
import {
  OPEN_REVIEW_FORM,
  PORTAL_PAGE_LOADED,
  PORTAL_PAGE_UNLOADED
} from '../../constants/actionTypes';
import agent from '../../agent';
import Tool from './Tool';
import SubHeader from '../Common/SubHeader';

const mapStateToProps = state => ({
  ...state.portal,
  appName: state.common.appName,
  token: state.common.token
});
const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({
      type: PORTAL_PAGE_LOADED,
      payload: agent.tools.index()
    }),
  onUnload: () =>
    dispatch({ type: PORTAL_PAGE_UNLOADED }),
  triggerNewReviewForm: (tool) => {
    dispatch({
      type: OPEN_REVIEW_FORM,
      tool: tool,
      payload: agent.tools.activeSurvey(tool.id)
    });
  }
});

class PortalPage extends Component {
  constructor(props) {
    super(props);
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  loadTools = props => {
    if (!props.tools) {
      return (
        <div>Loading...</div>
      );
    }
    else {
      return props.tools.map(tool => {
        console.log(tool);
        return (
          <Tool handler={this.props.triggerNewReviewForm} tool={tool}/>
        );
      });
    }
  };

  render() {
    return (
      <div className="">
        <div>
          <SubHeader icon={require('../../assets/images/launch_icon.png')} subHeader="Portal"/>
          {this.loadTools(this.props)}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalPage);
