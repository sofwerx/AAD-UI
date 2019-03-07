import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/css/portal.css';
import SubHeader from '../Common/SubHeader';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class PublicReviewPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="">
        <div>
          <SubHeader icon={require('../../assets/images/assessment_icon.png')}
                     subHeader="Public Reviews"/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicReviewPage);
