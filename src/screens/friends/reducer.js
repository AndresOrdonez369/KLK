import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  input: '',
  error: false,
  searchResult: [],
  message: '',
  errorFollow: false,
  messageError: '',
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
        message: 'Hubo un error haciendo la consoluta',
      };
    case Actions.CLEAN_SEARCH:
      return {
        ...state,
        searchResult: [],
      };
    case Actions.FOLLOW_SOMEONE_ERROR:
    case Actions.UNFOLLOW_SOMEONE_ERROR:
      return {
        ...state,
        errorFollow: true,
        messageError: 'Hubo un error, inténtalo nuevamente',
      };
    case Actions.GET_FOLLOWS_ERROR:
      return {
        ...state,
        errorFollow: true,
        messageError: 'Hubo un error consultando los datos de tus amigos',
      };
    default:
      return { ...state };
  }
};
