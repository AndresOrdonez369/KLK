import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const updateLoader = (value) => ({
  type: Actions.SET_LOADER_PROFILE,
  payload: value,
});

export const fetchUserData = () => async (dispatch) => {
  const { uid, email, photoURL } = await firebase.auth().currentUser;
  try {
    const dbh = firebase.firestore();
    const userCollection = dbh.collection('users').doc(uid);
    const snapShot = await userCollection.get();
    if (!snapShot) {
      return dispatch({
        type: Actions.USER_FETCH_FAILED,
        payload: 'No se encontraron datos de usuario',
      });
    }
    const { userName, name } = snapShot.data();
    return dispatch({
      type: Actions.USER_FETCH_DBASE,
      payload: {
        userName, name, uid, email, photoURL,
      },
    });
  } catch (error) {
    return dispatch({
      type: Actions.USER_FETCH_FAILED,
      error: 'Error trayendo datos de usuario',
    });
  }
};

export const userUploadImagen = (imagenURL) => async (dispatch) => {
  try {
    const user = firebase.auth().currentUser;
    const userPhothoURL = `/Users/profilePhotos/${user.uid}.png`;
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
      playload: url,
    });
  } catch (error) {
    return dispatch({
      type: Actions.USER_UPDATE_IMAGEN_ERROR,
      playload: error,
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
  playload: url,
});
