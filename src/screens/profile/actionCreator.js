import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const updateLoader = (value) => ({
  type: Actions.SET_LOADER_PROFILE,
  payload: value,
});

export const setDataChange = (value) => ({
  type: Actions.SET_DATA_CHANGE,
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
    const {
      userName, name, coverURL, description,
    } = snapShot.data();
    return dispatch({
      type: Actions.USER_FETCH_DBASE,
      payload: {
        userName, name, uid, email, photoURL, coverURL, description,
      },
    });
  } catch (error) {
    return dispatch({
      type: Actions.USER_FETCH_FAILED,
      error: 'Error trayendo datos de usuario',
    });
  }
};

export const updateDataUser = (data, uid) => (dispatch) => {
  const dbh = firebase.firestore();
  const uidCollection = dbh.collection('users').doc(uid);
  uidCollection
    .update(data)
    .then(() => dispatch({
      type: Actions.USER_DB_UPDATE,
    }))
    .catch((error) => {
      console.log('error dbUpdate: ', error);
    });
};

export const userUploadImagen = (imagenURL, type) => async (dispatch) => {
  try {
    const user = firebase.auth().currentUser;
    const userPhothoURL = type === 'picture'
      ? `/Users/profilePhotos/${user.uid}.png` : `/Users/coverPhotos/${user.uid}.png`;
    const storage = firebase.storage().ref();
    const imagePath = storage.child(userPhothoURL);
    // eslint-disable-next-line no-undef
    const response = await fetch(imagenURL);
    const imagenBlob = await response.blob();
    await imagePath.put(imagenBlob);

    const url = await storage
      .child(userPhothoURL)
      .getDownloadURL();

    if (type === 'picture') {
      await user.updateProfile({
        displayName: user.displayName,
        photoURL: url,
      });
    }

    if (type === 'cover') {
      const dbh = firebase.firestore();
      const uidCollection = dbh.collection('users').doc(user.uid);
      await uidCollection.update({ coverURL: url });
    }

    return dispatch({
      type: type === 'picture' ? Actions.USER_UPDATE_IMAGEN_URL : Actions.USER_UPDATE_COVER_URL,
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

export const updateDescription = (text) => ({
  type: Actions.UPDATE_DESCRIPTION_PROFILE,
  payload: text,
});

export const getExtraProfile = (uid) => async (dispatch) => {
  console.log(uid);
  const dbh = firebase.firestore();
  const snapShot = await dbh.collection('users').doc(String(uid)).get();
  if (!snapShot) {
    return dispatch({
      type: Actions.ANOTHER_USER_FETCH_FAILED,
      payload: 'No se encontraron datos de usuario',
    });
  }
  console.log('snap', snapShot.data());
  const {
    userName, name, coverURL, description, following, followers, imageURL,
  } = snapShot.data();
  return dispatch({
    type: Actions.ANOTHER_USER_FETCH,
    payload: {
      userName, name, imageURL, coverURL, description, followers, following,
    },
  });
};

export const cleanExtraProfile = () => ({
  type: Actions.CLEAN_EXTRA_PROFILE,
});
