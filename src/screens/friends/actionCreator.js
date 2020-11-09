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
