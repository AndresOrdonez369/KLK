import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const updateLoader = (value) => ({
  type: Actions.UPDATE_LOADER_POST,
  value,
});

export const submitPost = (
  uid, nickName, body, mediaURL, uploaded, date,
) => async (dispatch) => {
  const db = firebase.firestore();
  const collection = db.collection('posts');
  await collection.add({
    authorID: uid,
    authorNick: nickName,
    description: body,
    mediaURL,
    type: uploaded,
    createdAt: date,
  })
    .then(() => dispatch({
      type: Actions.UPDATE_POST_SUCCESS,
      payload: 'Publicación cargada correctamente',
    }))
    .catch(() => dispatch({
      type: Actions.UPDATE_POST_ERROR,
      payload: 'Hubo un error subiendo la publicación',
    }));
};

export const uploadImage = (image, uid) => async (dispatch) => {
  try {
    const random = Math.random().toString(36).substring(2)
      .concat(Math.random().toString(36).substring(2));
    const userPhothoURL = `/posts/images/${uid}/${random}.png`;
    const storage = firebase.storage().ref();
    const imagePath = storage.child(userPhothoURL);
    const response = await fetch(image);
    const imagenBlob = await response.blob();
    await imagePath.put(imagenBlob);

    const url = await storage
      .child(userPhothoURL)
      .getDownloadURL();

    return dispatch({
      type: Actions.UPDATE_PHOTO_SUCCESS,
      payload: url,
    });
  } catch (error) {
    return dispatch({
      type: Actions.UPDATE_PHOTO_ERROR,
      payload: 'No se pudo cargar la imagen',
    });
  }
};

export const uploadVideo = (video, uid) => async (dispatch) => {
  try {
    const random = Math.random().toString(36).substring(2)
      .concat(Math.random().toString(36).substring(2));
    const userVideoURL = `/posts/videos/${uid}/${random}.avi`;
    const storage = firebase.storage().ref();
    const imagePath = storage.child(userVideoURL);
    const response = await fetch(video);
    const imagenBlob = await response.blob();
    await imagePath.put(imagenBlob);

    const url = await storage
      .child(userVideoURL)
      .getDownloadURL();

    return dispatch({
      type: Actions.UPDATE_VIDEO_SUCCESS,
      payload: url,
    });
  } catch (error) {
    return dispatch({
      type: Actions.UPDATE_VIDEO_ERROR,
      payload: 'No se pudo cargar el video',
    });
  }
};

export const uploadAudio = (audio, name, uid) => async (dispatch) => {
  try {
    const userAudioURL = `/posts/audios/${uid}/${name}.mp3`;
    const storage = firebase.storage().ref();
    const imagePath = storage.child(userAudioURL);
    const response = await fetch(audio);
    const imagenBlob = await response.blob();
    await imagePath.put(imagenBlob);

    const url = await storage
      .child(userAudioURL)
      .getDownloadURL();

    return dispatch({
      type: Actions.UPDATE_AUDIO_SUCCESS,
      payload: url,
    });
  } catch (error) {
    return dispatch({
      type: Actions.UPDATE_AUDIO_ERROR,
      payload: 'No se pudo cargar la imagen',
    });
  }
};

export const cleanNewPost = () => ({
  type: Actions.CLEAN_POST,
});
