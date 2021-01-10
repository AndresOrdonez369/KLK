import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  error: false,
  comments: [],
  message: '',
  post: {},
};
export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        error: false,
        message: action.message,

      };
    case Actions.SUBMIT_COMMENT_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case Actions.GET_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case Actions.UPDATE_CLEAN_COMMNET:
      return {
        ...state,
        comments: [],
      };
    default:
      return { ...state };
  }
};
