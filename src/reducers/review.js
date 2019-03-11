import {
  ASYNC_START, MY_REVIEWS_LOADED, MY_REVIEWS_UNLOADED,
  OPEN_REVIEW_FORM,
  REVIEW_FORM_LOADED,
  REVIEW_FORM_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case OPEN_REVIEW_FORM:
      return {
        ...state,
        tool: action.tool,
        activeSurveys: action.payload.surveys
      };
    case REVIEW_FORM_LOADED:
      return {
        ...state,
        survey: {
          id: action.payload.survey.id,
          questions: action.payload.survey.questions,
          survey_name: action.payload.survey.survey_name
        }
      };
    case MY_REVIEWS_LOADED:
      return {
        ...state,
        surveyResponses: action.payload.surveyResponses
      };
    case MY_REVIEWS_UNLOADED:
    case REVIEW_FORM_UNLOADED:
      return {};
    case ASYNC_START:
      return {
        ...state,
        inProgress: true
      };
    default:
      return state;
  }
};
