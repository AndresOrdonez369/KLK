import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  sendState: '',
  messages: [],
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SEND:
      return { ...state, sendState: action.carga };
    case Actions.LOAD:
      return { ...state, messages: action.carga };
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    default:
      return { ...state };
  }
};
