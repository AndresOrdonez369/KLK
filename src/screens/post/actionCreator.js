import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const submitPost = (
  uid, nickName, body, imageURL, videoURL, audioURL, uploaded, date,
) => async (dispatch) => {
  const db = firebase.firestore();
  const collection = db.collection('posts');
  await collection.add({
    audioURL,
    authorID: uid,
    authorNick: nickName,
    description: body,
    imageURL,
    type: uploaded,
    createdAt: date,
    videoURL,
  })
    .then(() => dispatch({
      type: Actions.UPDATE_POST_SUCCESS,
    }))
    .catch(() => dispatch({
      type: Actions.UPDATE_POST_ERROR,
      payload: 'Hubo un error subiendo la publicación',
    }));
};

export const uploadImage = (image, uid) => async (dispatch) => {
  try {
    const userPhothoURL = `/posts/images/${uid}/${image.uri}.png`;
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
    const userVideoURL = `/posts/videos/${uid}/${video.uri}.png`;
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

export const uploadAudio = (audio, uid) => async (dispatch) => {
  try {
    const userAudioURL = `/posts/images/${uid}/${audio.uri}.png`;
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
