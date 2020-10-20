import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  error: false,
  message: '.',
  imageURL: '',
  videoURL: '',
  audioURL: '',
  isLoading: false,
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
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
    case Actions.UPDATE_VIDEO_SUCCESS:
      return {
        ...state,
        error: false,
        videoURL: action.payload,
      };
    case Actions.UPDATE_AUDIO_SUCCESS:
      return {
        ...state,
        error: false,
        audioURL: action.payload,
      };
    case Actions.UPDATE_PHOTO_SUCCESS:
      return {
        ...state,
        error: false,
        imageURL: action.payload,
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
