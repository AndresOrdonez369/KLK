import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  input: '',
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.ACTUALIZARINPUT:
      return { ...state, input: action.carga };
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
