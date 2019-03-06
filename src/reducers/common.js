import slugify from 'slugify';

import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN,
  REGISTER,
  OPEN_REVIEW_FORM
} from '../constants/actionTypes';


const defaultState = {
  appName: 'Conduit',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  // console.log("[REDUCER] Common:" + action.type);
  switch (action.type) {
    case APP_LOAD:
      console.log(action.currentUser);
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.currentUser ? action.currentUser : null
      };
    case REDIRECT:
      return {
        ...state,
        redirectTo: null
      };
    case LOGOUT:
      return {
        ...state,
        redirectTo: 'landing-page',
        token: null,
        currentUser: null
      };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/portal',
        token: action.error ? null : action.payload.token,
        currentUser: action.error ? null : action.payload.user
      };
    case OPEN_REVIEW_FORM:
      const surveyName = action.payload.surveys[0].survey_name;
      const surveyId = action.payload.surveys[0].id;
      const reviewRedirect = `/review/${surveyId}/${slugify(surveyName)}`;
      return {
        ...state,
        redirectTo: action.error ? null : reviewRedirect
      };
    default:
      return state;
  }
};
