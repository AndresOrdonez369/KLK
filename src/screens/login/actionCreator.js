import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const loginEmailAndPassword = (email, password) => async (dispatch) => {
  await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      dispatch(updateIsLoading());
      if (Object.prototype.hasOwnProperty.call(result, 'type')) {
        return dispatch({
          type: Actions.LOGIN_ERROR,
          messageError: 'Error deconocido',
          isLoading: false,
        });
      }
      dispatch(updateIsLoading(false));
      return dispatch({
        type: Actions.LOGIN_SUCCESS,
      });
    })
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      return dispatch({
        type: Actions.LOGIN_ERROR,
        messageError: errorCode,
        isLoading: false,
      });
    });
};

export const updateIsLoading = (isLoading = true) => ({
  type: Actions.SET_LOADER,
  isLoading,
});

export const loginWithCredential = (idToken) => async (dispatch) => {
  try {
    const credential = firebase.auth.GoogleAuthProvider.credential(null, idToken);
    await firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log('entreeeee al error');
      // Handle Errors here.
      const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const { email } = error;
      // The firebase.auth.AuthCredential type that was used.
      // const { credential } = error;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        console.log('Email already associated with another account.');
        // Handle account linking here, if using.
      } else {
        console.error(error);
      }
    });
    return dispatch({
      type: Actions.LOGIN_SUCCESS,
    });
  } catch (error) {
    const errorCode = error.code;
    await firebase
      .firestore()
      .collection('prueba')
      .add({
        error: 'entre al error del loginWithCredential',
      });
    return dispatch({
      type: Actions.LOGIN_ERROR,
      messageError: errorCode,
      isLoading: false,
    });
  }
};
