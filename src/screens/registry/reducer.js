import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  error: false,
  errorCode: '',
  errorMessage: '',
  isLoading: false,
};

export default (state = STATE_INICIAL, action) => {
  const { isLoading } = action;
  switch (action.type) {
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    case Actions.REGISTER_ERROR:
      return {
        ...state,
        error: true,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
        isLoading,
      };
    case Actions.SET_LOADER_REGISTRY:
      return { ...state, isLoading };
    default:
      return { ...state };
  }
};
