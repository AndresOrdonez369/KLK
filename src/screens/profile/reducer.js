import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  user: {
    coverURL: '',
    name: '',
    userName: '',
    description: '',
  },
  imageURL: '',
  uploadPhotoError: '',
  isLoading: '',
  error: false,
  message: '',
  uid: '',
  email: '',
  modalType: '',
  dataChange: false,
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.UPDATE_DESCRIPTION_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          description: action.payload,
        },
      };
    case Actions.SET_LOADER_PROFILE:
      return { ...state, isLoading: action.payload };
    case Actions.USER_FETCH_FAILED:
      return {
        ...state,
        message: action.payload,
      };
    case Actions.USER_FETCH_DBASE:
      return {
        ...state,
        error: false,
        uid: action.payload.uid,
        email: action.payload.email,
        imageURL: action.payload.photoURL,
        user: {
          ...state.user,
          name: action.payload.name,
          userName: action.payload.userName,
          description: action.payload.description,
          coverURL: action.payload.coverURL,
        },
      };
    case Actions.USER_DB_UPDATE:
      return { ...state, error: false };
    case Actions.USER_UPDATE_IMAGEN_URL:
      return {
        ...state,
        imageURL: action.payload,
      };
    case Actions.USER_UPDATE_COVER_URL:
      return {
        ...state,
        user: {
          ...state.user,
          coverURL: action.payload,
        },
      };
    case Actions.USER_UPDATE_IMAGEN_ERROR:
      return {
        ...state,
        uploadPhotoError: action.payload,
      };
    case Actions.SHOW_MODAL_PROFILE:
      return {
        ...state,
        error: true,
        message: action.payload.message,
        modalType: action.payload.message,
      };
    case Actions.HIDE_MODAL_PROFILE:
      return {
        ...state,
        error: false,
      };
    case Actions.SET_DATA_CHANGE:
      return { ...state, dataChange: action.payload };
    default:
      return { ...state };
  }
};
