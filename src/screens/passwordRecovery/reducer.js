import Actions from '../../redux/actionTypes';
const INITIAL_STATE = {
  email: '',
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SIGN_OUT:
      return INITIAL_STATE;
    case Actions.PASSWORD_ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
};