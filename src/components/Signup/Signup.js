import React, { Component } from 'react';
import './Signup.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../Header/Header'
import PageFooter from '../PageFooter/PageFooter'
import { Row, Input } from 'react-materialize'
import { withRouter } from 'react-router'


class Signup extends Component {

  render() {
    return (
      <body>
        <Header />
        <Row>
            <Input placeholder="Placeholder" s={6} label="First Name" />
            <Input s={6} label="Last Name" />
            <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
            <Input type="password" label="password" s={12} />
            <Input type="email" label="Email" s={12} />
        </Row>
        <PageFooter />
       </body> 
    )
  }
}



const mapStateToProps = state => {
  return {
      username: state.auth.username,
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators({checkCookie}, dispatch)

export default withRouter(connect(mapStateToProps, null)(Signup))