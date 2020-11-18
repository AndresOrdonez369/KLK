import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  stories: [],
  error: false,
  message: '',
  showModal: false,
  modalType: '',
  titleModal: '',
  heightModal: 0,
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    case Actions.MODAL_FEED:
      return {
        ...state,
        showModal: action.payload.show,
        modalType: action.payload.type,
        titleModal: action.payload.title,
        heightModal: action.payload.height,
      };
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
