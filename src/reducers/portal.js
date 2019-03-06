import {
  PORTAL_PAGE_LOADED,
  PORTAL_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case PORTAL_PAGE_LOADED:
      return {
        ...state,
        tools: action.payload.tools
      };
    case PORTAL_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
