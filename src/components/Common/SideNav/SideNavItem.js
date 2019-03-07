import { Link } from 'react-router-dom';
import React from 'react';
const PropTypes = require('prop-types');


class SideNavItem extends React.Component {
  render() {
    const linkTo = this.props.linkTo;
    const label = this.props.label;
    return (
      <li className="border-bottom">
            <span>
                <Link onClick={this.props.onClick} className="link" to={linkTo}>{label}</Link>
            </span>
      </li>
    );
  }
}

SideNavItem.propTypes = {
  linkTo: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
};

export default SideNavItem
