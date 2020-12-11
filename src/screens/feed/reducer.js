import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  postList: [],
  hidenList: [],
  stories: [],
  error: false,
  message: '',
  showModal: false,
  modalType: '',
  titleModal: '',
  heightModal: 0,
  hidePostModal: false,
  realDataAction: false,
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    case Actions.RENDER_REAL_DATA:
      return { ...state, realDataAction: action.payload };
    case Actions.GET_HIDEN_LIST:
      return { ...state, hidenList: action.payload };
    case Actions.HPOST_MODAL:
      return { ...state, hidePostModal: action.payload };
    case Actions.MODAL_FEED:
      return {
        ...state,
        showModal: action.payload.show,
        modalType: action.payload.type,
        titleModal: action.payload.title,
        heightModal: action.payload.height,
      };
    case Actions.GET_POSTS:
      return { ...state, postList: [...state.postList, action.payload] };
    case Actions.GET_STORIES:
      return {
        ...state,
        stories: action.payload,
      };
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
    case Actions.SET_NEW_POST:
      return {
        ...state,
        postList: [...state.postList, action.payload],
      };
    default:
      return { ...state };
  }
};
