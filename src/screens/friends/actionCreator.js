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
  myUid, uid, imageURL, name, userName,
) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const usersCollection = db.collection('users').doc(uid).collection('followers');
    const followingCollection = db.collection('following').doc(myUid).collection('userFollowing');

    await followingCollection.doc(uid).set({ uid });

    await usersCollection.doc(myUid).set({ uid: myUid });

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
    const usersCollection = db.collection('users');
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

// eslint-disable-next-line consistent-return
export const getFollowersByUid = (id, start = 0, quantity = 0) => async (dispatch) => {
  if (quantity === 0) {
    try {
      const user = await firebase.auth().currentUser;
      const db = firebase.firestore();
      const usersCollection = db.collection('users');

      const query = await usersCollection.doc(id).collection('followers');
      if (start === 0) {
        query.get()
          .then((snap) => dispatch({
            type: user.uid === id ? Actions.SET_MY_FOLLOWERS : Actions.SET_FOLLOWERS,
            payload: snap.size,
          }));
      }
      query.orderBy('uid', 'asc').startAt(start).limit(30).get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            const queryUid = doc.data().uid;
            await usersCollection.doc(queryUid).get()
              .then((ref) => {
                const {
                  uid, name, userName, imageURL,
                } = ref.data();
                return dispatch({
                  type: user.uid === id ? Actions.GET_MY_FOLLOWERS : Actions.GET_FOLLOWERS,
                  payload: {
                    uid, name, userName, imageURL,
                  },
                });
              });
          });
        });
    } catch (error) {
      console.log('error getting follows', error);
      return dispatch({
        type: Actions.GET_FOLLOWS_ERROR,
      });
    }
  }
};

// eslint-disable-next-line consistent-return
export const getFollowingsByUid = (id, start = 0, quantity = 0) => async (dispatch) => {
  if (quantity === 0) {
    try {
      const user = await firebase.auth().currentUser;
      const db = firebase.firestore();
      const usersCollection = db.collection('users');
      const followingCollection = db.collection('following');

      const query = await followingCollection.doc(id).collection('userFollowing');
      if (start === 0) {
        query.get()
          .then((snap) => dispatch({
            type: user.uid === id ? Actions.SET_MY_FOLLOWINGS : Actions.SET_FOLLOWINGS,
            payload: snap.size,
          }));
      }
      query.orderBy('uid', 'asc').startAt(start).limit(30).get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            const queryUid = doc.data().uid;
            if (id !== queryUid) {
              await usersCollection.doc(queryUid).get()
                .then((ref) => {
                  const {
                    uid, name, userName, imageURL,
                  } = ref.data();
                  return dispatch({
                    type: user.uid === id ? Actions.GET_MY_FOLLOWINGS : Actions.GET_FOLLOWINGS,
                    payload: {
                      uid, name, userName, imageURL,
                    },
                  });
                });
            }
          });
        });
    } catch (error) {
      console.log('error getting follows', error);
      return dispatch({
        type: Actions.GET_FOLLOWS_ERROR,
      });
    }
  }
};
