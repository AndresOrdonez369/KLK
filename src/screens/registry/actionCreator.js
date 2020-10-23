import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';
import { loginEmailAndPassword } from '../login/actionCreator';

export const IsLoading = (isLoading = true) => ({
  type: Actions.SET_LOADER_REGISTRY,
  isLoading,
});

export const register = (email, password, name, userName) => async (dispatch) => {
  dispatch(IsLoading(true));
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch(IsLoading(false));
      return dispatch({
        type: Actions.REGISTER_ERROR,
        payload: { errorCode, errorMessage },
      });
    // ...
    }).then(async ({ user }) => {
      dispatch(IsLoading(false));
      const dbh = firebase.firestore();
      const usersCollection = dbh.collection('users');
      await usersCollection.doc(user.uid).set({
        name, userName, coverURL: '', description: '',
      })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return dispatch({
            type: Actions.REGISTER_ERROR,
            payload: { errorCode, errorMessage },
          });
        });
    })
    .then(dispatch(loginEmailAndPassword(email, password)));
  await firebase.auth().currentUser.updateProfile({ displayName: name });
};
