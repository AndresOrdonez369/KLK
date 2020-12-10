import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';
import { getFollowersByUid, getFollowingsByUid } from '../friends/actionCreator';

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
    await dispatch(getFollowersByUid(uid));
    await dispatch(getFollowingsByUid(uid));
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

export const getExtraProfile = (id) => async (dispatch) => {
  const dbh = firebase.firestore();
  const snapShot = await dbh.collection('users').doc(String(id)).get();
  if (!snapShot) {
    return dispatch({
      type: Actions.ANOTHER_USER_FETCH_FAILED,
      payload: 'No se encontraron datos de usuario',
    });
  }
  const {
    userName, name, coverURL, description, imageURL, uid,
  } = snapShot.data();
  return dispatch({
    type: Actions.ANOTHER_USER_FETCH,
    payload: {
      userName, name, imageURL, coverURL, description, uid,
    },
  });
};

export const cleanExtraProfile = () => ({
  type: Actions.CLEAN_EXTRA_PROFILE,
});

export const getPosts = (uid) => async (dispatch) => {
  const db = firebase.firestore();
  if (uid !== '') {
    await db.collection('posts').doc(uid).collection('userPosts').limit(20)
      .get()
      .then((posts) => {
        posts.forEach(async (post) => {
          const pathReference = await firebase.storage().ref(`/Users/profilePhotos/${post.data().authorID}.png`);
          const url = await pathReference.getDownloadURL();
          const date0 = new Date(post.data().createdAt);
          const date = date0.toLocaleDateString();
          const likes0 = await firebase.firestore().collection('posts').doc(post.data().authorID).collection('userPosts')
            .doc(post.id)
            .collection('likes')
            .get();
          const post0 = {
            pid: post.id,
            urlAvatar: url,
            authorName: post.data().author,
            mensaje: post.data().description,
            mediaLink: post.data().mediaURL,
            type: post.data().type,
            timestamp: date,
            likes: likes0.size,
            authorId: post.data().authorID,
          };
          dispatch({
            type: Actions.GET_POSTS_PROFILE,
            payload: post0,
          });
        });
      });
  }
};
export const getExtraUserPosts = (uid) => async (dispatch) => {
  const db = firebase.firestore();
  if (uid !== '') {
    await db.collection('posts').doc(uid).collection('userPosts').limit(20)
      .get()
      .then((posts) => {
        posts.forEach(async (post) => {
          const pathReference = await firebase.storage().ref(`/Users/profilePhotos/${post.data().authorID}.png`);
          const url = await pathReference.getDownloadURL();
          const date0 = new Date(post.data().createdAt);
          const date = date0.toLocaleDateString();
          const likes0 = await firebase.firestore().collection('posts').doc(post.data().authorID).collection('userPosts')
            .doc(post.id)
            .collection('likes')
            .get();
          const post0 = {
            pid: post.id,
            urlAvatar: url,
            authorName: post.data().author,
            mensaje: post.data().description,
            mediaLink: post.data().mediaURL,
            type: post.data().type,
            timestamp: date,
            likes: likes0.size,
            authorId: post.data().authorID,
          };
          dispatch({
            type: Actions.GET_EXTRA_USER_POSTS,
            payload: post0,
          });
        });
      });
  }
};
