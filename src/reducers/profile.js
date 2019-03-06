import {
  ASYNC_START, USER_INFO_LOADED, USER_INFO_UNLOADED, UPDATE_USER_INFO
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
    case USER_INFO_LOADED:
      return {
        ...state,
        currentUser: action.payload.user

      };
    case USER_INFO_UNLOADED:
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
