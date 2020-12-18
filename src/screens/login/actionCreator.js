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
  dispatch(updateIsLoading());
  try {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    const result = await firebase.auth().signInWithCredential(credential);
    if (Object.prototype.hasOwnProperty.call(result, 'type')) {
      return dispatch({
        type: Actions.LOGIN_ERROR,
        messageError: 'unknownError',
        isLoading: false,
      });
    }
    return dispatch({
      type: Actions.LOGIN_SUCCESS,
    });
  } catch (error) {
    const errorCode = error.code;
    return dispatch({
      type: Actions.LOGIN_ERROR,
      messageError: errorCode,
      isLoading: false,
    });
  }
};
