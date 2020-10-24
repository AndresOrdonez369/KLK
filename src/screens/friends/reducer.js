import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  input: '',
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    default:
      return { ...state };
  }
};
