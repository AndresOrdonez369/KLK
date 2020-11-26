import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  error: false,
  message: '',
  image: '',
  video: '',
  messages: [],
  docID: '',
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    case Actions.UPLOAD_PHOTO_CHAT:
      return {
        ...state,
        image: action.payload,
        error: false,
      };
    case Actions.UPLOAD_VIDEO_CHAT:
      return {
        ...state,
        video: action.payload,
        error: false,
      };
    case Actions.CHAT_ERROR:
    case Actions.UPLOAD_VIDEO_CHAT_ERROR:
    case Actions.UPLOAD_PHOTO_CHAT_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case Actions.MESSAGE_SENT:
      return {
        ...state,
        error: false,
        image: '',
        video: '',
      };
    case Actions.GET_MESSAGES:
      return {
        ...state,
        error: false,
        messages: action.payload,
      };
    case Actions.SET_DOC_ID:
      return {
        ...state,
        docID: action.payload,
      };
    default:
      return { ...state };
  }
};
