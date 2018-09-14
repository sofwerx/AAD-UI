import React, { Component } from 'react';
import './PageFooter.css';
import { connect } from 'react-redux'
import { Footer, Navbar, NavItem, Icon } from 'react-materialize'


class PageFooter extends Component {

  render() {
        return (
            <Navbar id="footer"></Navbar>
        )
    }
  }


export default connect(null, null)(PageFooter)