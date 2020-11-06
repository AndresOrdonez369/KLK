import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  input: '',
  error: false,
  searchResult: [],
  message: '',
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    case Actions.DATA_SEARCH:
      return {
        ...state,
        error: false,
        searchResult: [...state.searchResult, action.payload],
      };
    case Actions.SEARCH_ERROR:
      return {
        ...state,
        error: true,
        message: 'Hubo un error en la consoluta',
      };
    default:
      return { ...state };
  }
};
