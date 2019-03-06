import { LANDING_PAGE_LOADED, LANDING_PAGE_UNLOADED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LANDING_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      };
    case LANDING_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
