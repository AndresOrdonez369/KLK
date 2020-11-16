import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const searcherFirestore = (string) => async (dispatch) => {
  const db = firebase.firestore();
  const usersCollection = db.collection('users');
  await usersCollection.where('userName', '>=', string).where('userName', '<=', `${string}\uf8ff`).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => dispatch({
        type: Actions.DATA_SEARCH,
        payload: doc.data(),
      }));
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
      return dispatch({
        type: Actions.SEARCH_ERROR,
      });
    });
};

export const cleanSearch = () => ({
  type: Actions.CLEAN_SEARCH,
});

export const followFirestore = (
  myUid, myUserName, uid, imageURL, name, userName,
) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const usersCollection = db.collection('users').doc(uid).collection('followers');
    const followingCollection = db.collection('following').doc(myUid).collection('userFollowing');

    await followingCollection.doc(uid).set({
      uid, userName,
    });

    await usersCollection.doc(myUid).set({
      uid: myUid, userName: myUserName,
    });

    return dispatch({
      type: Actions.FOLLOW_SOMEONE,
      payload: {
        uid, userName, name, imageURL,
      },
    });
  } catch (error) {
    console.log('error following', error);
    return dispatch({
      type: Actions.FOLLOW_SOMEONE_ERROR,
    });
  }
};

export const unfollowFirestore = (myUid, uid) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const usersCollection = db.collection('users').doc;
    const followingCollection = db.collection('following');

    await usersCollection.doc(uid).collection('followers').doc(myUid).delete();

    await followingCollection.doc(myUid).collection('userFollowing').doc(uid).delete();

    return dispatch({
      type: Actions.UNFOLLOW_SOMEONE,
      payload: uid,
    });
  } catch (error) {
    console.log('error unfollowing', error);
    return dispatch({
      type: Actions.UNFOLLOW_SOMEONE_ERROR,
    });
  }
};
