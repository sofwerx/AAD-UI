import React, { Component } from 'react';

import { Row, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize';
import '../assets/css/profile.css';

import {
  USER_INFO_LOADED,
  USER_INFO_UNLOADED
} from '../constants/actionTypes';
import agent from '../agent';
import { connect } from 'react-redux';
import ProfileForm from './Forms/ProfileInfoForm';
import PasswordForm from './Forms/PasswordForm';

const mapStateToProps = state => ({
  ...state.profile
});
const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({
      type: USER_INFO_LOADED,
      payload: agent.auth.current()
    }),
  onUnload: () =>
    dispatch({ type: USER_INFO_UNLOADED })
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.currentUser) {
      return (<div>Loading...</div>);
    }
    return (
      <main className="landing-page edit-profile-wrapper">
        <h3>Edit Profile</h3>
        <CardPanel className="card-panel">
          <Row>
            <Collapsible accordion defaultActiveKey={0}>
              <CollapsibleItem className="profile-section-wrapper" header="Profile Information"
                               icon="face">
                <ProfileForm currentUser={this.props.currentUser}/>
              </CollapsibleItem>
              <CollapsibleItem className="profile-section-wrapper" header="Update Password"
                               icon="lock">
                <PasswordForm currentUser={this.props.currentUser}/>
              </CollapsibleItem>
            </Collapsible>
          </Row>
        </CardPanel>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
