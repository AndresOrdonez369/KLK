import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  imageURL: '',
  uploadPhotoError: '',
  isLoading: '',
  error: false,
  message: '',
  uid: '',
  name: '',
  userName: '',
  email: '',
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.SET_LOADER_PROFILE:
      return { ...state, isLoading: action.payload };
    case Actions.USER_FETCH_FAILED:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case Actions.USER_FETCH_DBASE:
      return {
        ...state,
        error: false,
        uid: action.payload.uid,
        name: action.payload.name,
        userName: action.payload.userName,
        email: action.payload.email,
        imageURL: action.payload.photoURL,
      };
    case Actions.USER_UPDATE_IMAGEN_URL:
      return {
        ...state,
        imageURL: action.payload,
      };
    case Actions.USER_UPDATE_IMAGEN_ERROR:
      return {
        ...state,
        uploadPhotoError: action.payload,
      };
    default:
      return { ...state };
  }
};
