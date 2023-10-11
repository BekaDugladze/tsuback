export const setDivVisibility = (isVisible) => ({
    type: 'SET_DIV_VISIBILITY',
    payload: isVisible,
  });
  
  export const SET_AUTHED = 'SET_AUTHED';
  export function setAuthed(authed) {
    return {
      type: SET_AUTHED,
      payload: authed,
    };
  }

