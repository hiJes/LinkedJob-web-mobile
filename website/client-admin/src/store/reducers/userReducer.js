import { USERS_ADD_DATA, USERS_ADD_FAILED, USERS_LOGIN_FAILED, USERS_LOGIN_SUCCESS } from "../actions/actionType";

const initialState = {
  users: {},
  error: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_ADD_DATA:
      return {
        ...state,
        users: action.payload
      };
    case USERS_ADD_FAILED:
      return {
        ...state,
        error: action.payload
      };
    case USERS_LOGIN_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case USERS_LOGIN_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
  
}