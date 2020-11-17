import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const getStories = (uid) => async (dispatch) => {
  const db = firebase.firestore();
  const followingCollection = db.collection('following').doc(uid).collection('userFollowing');
  await followingCollection.get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        const queryUid = doc.data().uid;
        await db.collection('stories').where('authorID', '==', queryUid).get()
          .then((query) => {
            query.forEach((ref) => dispatch({
              type: Actions.GET_STORIES,
              payload: ref.data(),
            }));
          })
          .catch((error) => {
            console.log(error);
            return dispatch({
              type: Actions.GET_STORIES_ERROR,
            });
          });
      });
    });

  await db.collection('stories').where('authorID', '==', uid).get()
    .then((query) => {
      query.forEach((ref) => dispatch({
        type: Actions.GET_STORIES,
        payload: ref.data(),
      }));
    })
    .catch((error) => {
      console.log(error);
      return dispatch({
        type: Actions.GET_STORIES_ERROR,
      });
    });
};

export const postStory = (image, uid, nick, profileImg) => async (dispatch) => {
  try {
    const random = Math.random().toString(36).substring(2)
      .concat(Math.random().toString(36).substring(2));
    const userPhothoURL = `/Stories/${uid}/${random}.png`;
    const storage = firebase.storage().ref();
    const imagePath = storage.child(userPhothoURL);
    // eslint-disable-next-line no-undef
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
      authorProfileImg: profileImg,
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
