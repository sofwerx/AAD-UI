// import article from './reducers/article';
// import articleList from './reducers/articleList';
// import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import landingPage from './reducers/landingPage';
import auth from './reducers/auth';
import profile from './reducers/profile';
import portal from './reducers/portal';
import review from './reducers/review';
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  auth,
  common,
  landingPage,
  profile,
  portal,
  review,
  router: connectRouter(history)
});
