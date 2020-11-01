import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const VideoFeedInputUpdate = ({ prop, value }) => ({
  type: Actions.ACTUALIZARINPUT,
  payload: { prop, value },
});

export const postStory = (image, uid, nick) => async (dispatch) => {
  try {
    const random = Math.random().toString(36).substring(2)
      .concat(Math.random().toString(36).substring(2));
    const userPhothoURL = `/Stories/${uid}/${random}.png`;
    const storage = firebase.storage().ref();
    const imagePath = storage.child(userPhothoURL);
    const response = await fetch(image);
    const imagenBlob = await response.blob();
    await imagePath.put(imagenBlob);

    const url = await storage
      .child(userPhothoURL)
      .getDownloadURL();

    const date = Date.now();

    const storyObj = {
      authorID: uid,
      authorUsername: nick,
      mediaURL: url,
      createdAt: date,
    };

    const dbh = firebase.firestore();
    const storiesCollection = dbh.collection('stories');
    await storiesCollection.add(storyObj);

    return dispatch({
      type: Actions.USER_UPLOAD_STORY,
      payload: storyObj,
    });
  } catch (error) {
    return dispatch({
      type: Actions.USER_UPLOAD_STORY_ERROR,
      payload: error,
    });
  }
};
