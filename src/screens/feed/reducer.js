import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  stories: [],
  error: false,
  message: '',
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    case Actions.GET_STORIES:
    case Actions.USER_UPLOAD_STORY:
      return {
        ...state,
        error: false,
        stories: [...state.stories, action.payload],
      };
    case Actions.USER_UPLOAD_STORY_ERROR:
      return {
        ...state,
        error: true,
        message: 'Hubo un error subiendo la historia',
      };
    case Actions.GET_STORIES_ERROR:
      return {
        ...state,
        error: true,
        message: 'Hubo un error trayendo los datos',
      };
    default:
      return { ...state };
  }
};
