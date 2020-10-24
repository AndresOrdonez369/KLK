import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  error: '',
  message: '',
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    case Actions.SIGN_OUT_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    default:
      return { ...state };
  }
};
