import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const signOut = () => (dispatch) => {
  firebase.auth().signOut()
};
