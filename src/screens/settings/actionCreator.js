import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const signOut = () => async (dispatch) => {
  dispatch({
    type: Actions.SIGN_OUT,
  });
  await firebase.auth().signOut()
    .catch(() => dispatch({
      type: Actions.SIGN_OUT_ERROR,
      payload: 'Hubo un error cerrando cesión',
    }));
};
