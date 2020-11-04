import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  error: false,
  message: '.',
  mediaURL: '',
  isLoading: false,
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SIGN_OUT:
    case Actions.CLEAN_POST:
      return STATE_INICIAL;
    case Actions.UPDATE_LOADER_POST:
      return {
        ...state,
        isLoading: action.value,
      };
    case Actions.UPDATE_POST_SUCCESS:
      return {
        ...state,
        error: false,
        message: action.payload,
      };
    case Actions.UPLOAD_YOUTUBE_LINK:
    case Actions.UPDATE_AUDIO_SUCCESS:
    case Actions.UPDATE_PHOTO_SUCCESS:
    case Actions.UPDATE_VIDEO_SUCCESS:
      return {
        ...state,
        error: false,
        mediaURL: action.payload,
      };
    case Actions.UPDATE_POST_ERROR:
    case Actions.UPDATE_VIDEO_ERROR:
    case Actions.UPDATE_AUDIO_ERROR:
    case Actions.UPDATE_PHOTO_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    default:
      return { ...state };
  }
};
