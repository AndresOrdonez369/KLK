import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

const db = firebase.firestore();

export const getPosts = (uid) => async (dispatch) => {
  if (uid !== '') {
    await db.collection('following').doc(uid).collection('userFollowing').limit(10)
      .get()
      .then((followeds) => {
        const postList = [];
        followeds.forEach(async (followed) => {
          const queryUid = followed.data().uid;
          console.log('este es el queryUid', queryUid);
          await db.collection('posts').doc(queryUid).collection('userPosts').limit(2)
            .get()
            .then((posts) => {
              posts.forEach(async (post) => {
                const pathReference = firebase.storage().ref(`/Users/profilePhotos/${post.data().authorID}.png`);
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
                postList.push(post0);
              });
            });
        });
        return dispatch({
          type: Actions.GET_POSTS,
          payload: postList,
        });
      });
  }
};

export const getStories = (uid) => async (dispatch) => {
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
            dispatch(handleModalFeed(true, 'error', 'Hubo un error trayendo los datos de las historias'));
            console.log(error);
            return dispatch({
              type: Actions.GET_STORIES_ERROR,
            });
          });
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

    dispatch(handleModalFeed(true, 'confirmation', 'Historia subida correctamente'));

    return dispatch({
      type: Actions.USER_UPLOAD_STORY,
      payload: storyObj,
    });
  } catch (error) {
    dispatch(handleModalFeed(true, 'error', 'Hubo un error al subir la historia, intente nuevamente'));
    return dispatch({
      type: Actions.USER_UPLOAD_STORY_ERROR,
      payload: error,
    });
  }
};

export const handleModalFeed = (show, type = 'confirmation', title = '', height = 0.3) => ({
  type: Actions.MODAL_FEED,
  payload: {
    show, type, title, height,
  },
});
