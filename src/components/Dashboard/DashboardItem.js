import React from 'react';
import '../../assets/css/dashboard.css';
import { Link } from 'react-router-dom';

const PropTypes = require('prop-types');
class DashboardItem extends React.Component {
  render() {
    return (
      <div className="dashboardItem">
        <Link to={this.props.to}>
          <div className="dashboard-block-wrapper">
            <img alt="icon" src={this.props.iconLoc} width="100px"/>
            <div className="j-title">{this.props.title}</div>
            <hr className="thin width40Per"/>
            <p className="dashboard-description-text">
              {this.props.description}
            </p>
            <hr className="thin width40Per"/>
          </div>
        </Link>
      </div>
    );
  }
}

DashboardItem.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
  iconLoc: PropTypes.string
};

export default DashboardItem;
