import agent from '../agent';
import Header from './Common/Header';
import Footer from './Common/Footer';
import LoginPage from './Auth/LoginPage';
import LandingPage from './LandingPage';
import RegisterPage from './Auth/RegisterPage';
import PortalPage from './Portal/PortalPage';
import DashboardPage from './Dashboard/DashboardPage';
import ProfilePage from './ProfilePage';
import NotFoundPage from './NotFoundPage';
import ReviewPage from './Review/ReviewPage';
import PublicReviewPage from './Review/PublicReviewPage';
import StatisticsPage from './Statistics/StatisticsPage';


import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import { store } from '../store';
import { push } from 'connected-react-router';

import '../assets/css/app.css';
import Redirect from 'react-router/es/Redirect';
import SurveyResponsesPage from './Review/SurveyResponsesPage';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (currentUser, token) =>
    dispatch({ type: APP_LOAD, currentUser, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

const PrivateRoute = ({component: Component, currentUser, ...rest}) => {
  return (
    <Route
        {...rest}
        render={(props) => currentUser !== null
            ? <Component {...props} />
            : <Redirect to={{pathname: '/', state: {from: props.location}}}/>}
    />
)};

const PublicRoute = ({component: Component, currentUser, ...rest}) => {
  return (
      <Route
          {...rest}
          render={(props) => currentUser === null
              ? <Component {...props} />
              : <Redirect to={{pathname: '/dashboard', state: {from: props.location}}}/>
          }
      />
  )};

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    const currentUserString = window.localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

    //Pull currentUser from localStorage instead of API.
    this.props.onLoad(token ? currentUser : null, token);
    // this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div className="app-body">
          <Header
              currentUser={this.props.currentUser} />
          <main className="app">
          <Switch>
            <PublicRoute exact currentUser={this.props.currentUser} path="/" component={LandingPage}/>
            <PublicRoute currentUser={this.props.currentUser} path="/landing-page" component={LandingPage}/>
            <PublicRoute currentUser={this.props.currentUser} path="/login" component={LoginPage}/>
            <PublicRoute currentUser={this.props.currentUser} path="/register" component={RegisterPage} />
            <PrivateRoute currentUser={this.props.currentUser} path="/dashboard" component={DashboardPage}/>
            <PrivateRoute currentUser={this.props.currentUser} path="/portal" component={PortalPage}/>
            <PrivateRoute currentUser={this.props.currentUser}  path="/profile" component={ProfilePage}/>
            <PrivateRoute currentUser={this.props.currentUser}  path="/review/:survey_id/:slug" component={ReviewPage}/>
            <PrivateRoute currentUser={this.props.currentUser}  path="/reviews" component={SurveyResponsesPage}/>
            <PrivateRoute currentUser={this.props.currentUser}  path="/public" component={PublicReviewPage}/>
            <PrivateRoute currentUser={this.props.currentUser} path='/statistics' component={StatisticsPage}/>
            <Route component={NotFoundPage} />
            </Switch>
          </main>
          <Footer/>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
