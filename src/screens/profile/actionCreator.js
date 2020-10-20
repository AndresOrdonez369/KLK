import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const ProfileInputUpdate = ({ prop, value }) => ({
  type: Actions.ACTUALIZARINPUT,
  payload: { prop, value },
});

export const userUploadImagen = (imagenURL) => async (dispatch) => {
  try {
    const user = firebase.auth().currentUser;
    const userPhothoURL = `/Users/profilePhotos/${user.displayName}.png`;
    console.log(userPhothoURL,"BAND")
    const storage = firebase.storage().ref();
    const imagePath = storage.child(userPhothoURL);
    const response = await fetch(imagenURL);
    const imagenBlob = await response.blob();
    await imagePath.put(imagenBlob);

    const url = await storage
      .child(userPhothoURL)
      .getDownloadURL();

    await user.updateProfile({
      displayName: user.displayName,
      photoURL: url,
    });

    return dispatch({
      type: Actions.USER_UPDATE_IMAGEN_URL,
      payload: url,
    });
  } catch (error) {
    return dispatch({
      type: Actions.USER_UPDATE_IMAGEN_ERROR,
      payload: error,
    });
  }
};

export const showModalProfile = (message, type) => ({
  type: Actions.SHOW_MODAL_PROFILE,
  payload: { message, type },
});

export const hideModalProfile = () => ({
  type: Actions.HIDE_MODAL_PROFILE,
});

export const userUpdateImagenURL = (url) => ({
  type: Actions.USER_UPDATE_IMAGEN_URL,
  payload: url,
});
