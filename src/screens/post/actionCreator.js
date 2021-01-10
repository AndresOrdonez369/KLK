/* eslint-disable no-undef */
import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const updateLoader = (value) => ({
  type: Actions.UPDATE_LOADER_POST,
  value,
});

export const submitPost = (
  uid, name, body, mediaURL, uploaded, date, urlAvatar,
) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const followCollection = db.collection('following');
    const userCollectionRef = db.collection('posts').doc(uid).collection('userPosts');

    await followCollection.doc(uid).set({
      lastUpdate: Date.now(),
    });

    await userCollectionRef.add({
      authorID: uid,
      author: name,
      description: body,
      mediaURL,
      type: uploaded,
      createdAt: date,
    })
      .then((doc) => {
        const post = {
          pid: doc.id,
          authorName: name,
          mensaje: body,
          mediaLink: mediaURL,
          type: uploaded,
          timestamp: Number(date),
          likes: 0,
          authorId: uid,
          urlAvatar,
        };
        if (uploaded !== 'video') {
          dispatch({
            type: Actions.SET_NEW_POST,
            payload: post,
          });
        } else {
          dispatch({
            type: Actions.SET_NEW_VIDEOPOST,
            payload: post,
          });
        }
      });
    return dispatch({
      type: Actions.UPDATE_POST_SUCCESS,
      payload: 'Publicación cargada correctamente',
    });
  } catch (error) {
    console.log('error updating post', error);
    return dispatch({
      type: Actions.UPDATE_POST_ERROR,
      payload: 'Hubo un error subiendo la publicación',
    });
  }
};

export const uploadImage = (image, uid, type = 'posts') => async (dispatch) => {
  try {
    const random = Math.random().toString(36).substring(2)
      .concat(Math.random().toString(36).substring(2));
    const userPhothoURL = `/${type}/images/${uid}/${random}.png`;
    const storage = firebase.storage().ref();
    const imagePath = storage.child(userPhothoURL);
    const response = await fetch(image);
    const imagenBlob = await response.blob();
    await imagePath.put(imagenBlob);

    const url = await storage
      .child(userPhothoURL)
      .getDownloadURL();

    return dispatch({
      type: type === 'posts' ? Actions.UPDATE_PHOTO_SUCCESS : Actions.UPLOAD_PHOTO_CHAT,
      payload: url,
    });
  } catch (error) {
    return dispatch({
      type: type === 'posts' ? Actions.UPDATE_PHOTO_ERROR : Actions.UPLOAD_PHOTO_CHAT_ERROR,
      payload: 'No se pudo cargar la imagen',
    });
  }
};

export const uploadVideo = (video, uid, type = 'posts') => async (dispatch) => {
  try {
    const random = Math.random().toString(36).substring(2)
      .concat(Math.random().toString(36).substring(2));
    const userVideoURL = `/${type}/videos/${uid}/${random}.mp4`;
    const storage = firebase.storage().ref();
    const imagePath = storage.child(userVideoURL);
    const response = await fetch(video);
    const imagenBlob = await response.blob();
    await imagePath.put(imagenBlob);

    const url = await storage
      .child(userVideoURL)
      .getDownloadURL();

    return dispatch({
      type: type === 'posts' ? Actions.UPDATE_VIDEO_SUCCESS : Actions.UPLOAD_VIDEO_CHAT,
      payload: url,
    });
  } catch (error) {
    return dispatch({
      type: type === 'posts' ? Actions.UPDATE_VIDEO_ERROR : Actions.UPLOAD_VIDEO_CHAT_ERROR,
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

export const uploadYoutube = (value) => ({
  type: Actions.UPLOAD_YOUTUBE_LINK,
  payload: value,
});

export const cleanNewPost = () => ({
  type: Actions.CLEAN_POST,
});
