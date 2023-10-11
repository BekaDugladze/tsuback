// reducers/authReducer.js
// authReducer.js

import { SET_AUTHED } from '../action/action';

const initialState = {
  authed: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHED:
      return {
        ...state,
        authed: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;
