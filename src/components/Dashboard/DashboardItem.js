import React from 'react';
import '../../assets/css/dashboard.css';
import { Link } from 'react-router-dom';

const DashboardItem = (props) => {
  return (
    <div className="dashboardItem">
      <Link to={props.to}>
        <div className="dashboard-block-wrapper">
          <img alt="icon" src={props.iconLoc} width="100px"/>
          <div className="j-title">{props.title}</div>
          <hr className="thin width40Per"/>
          <p className="dashboard-description-text">
            {props.description}
          </p>
          <hr className="thin width40Per"/>
        </div>
      </Link>
    </div>
  );
};

export default DashboardItem;
