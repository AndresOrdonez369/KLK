import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

const db = firebase.firestore();

const getPosts = (uid) => async (dispatch) => {
  if (uid !== '') {
    await db.collection('posts').limit(40)
      .get()
      .then((users) => {
        users.forEach(async (user) => {
          const queryUid = user.data().uid;
          await db.collection('posts').doc(queryUid).collection('userPosts').where('type', '==', 'video')
            .limit(2)
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
                  type: Actions.GET_VIDEO_POSTS,
                  payload: post0,
                });
              });
            });
        });
      });
  }
};

export default getPosts;
