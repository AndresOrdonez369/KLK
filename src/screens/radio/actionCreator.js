import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const Send = (texto) => async (dispatch) => {
  const time = new Date().getTime();
  await firebase.firestore().collection('radios').doc('yLPys4sma3xh3zksZKrc').collection('chat')
    .add(
      {
        timeStamp: time,
        message: texto,
      },
    )
    .then(() => dispatch({
      type: Actions.SEND,
      carga: 'exito',
    }))
    .catch(() => dispatch({
      type: Actions.SEND,
      carga: 'error',
    }));
};

export const LoadMessages = () => async (dispatch) => {
  const messages = [];
  await firebase.firestore().collection('radios').doc('yLPys4sma3xh3zksZKrc').collection('chat')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().message);
        // console.log('este es el message', doc.data().message);
        // doc.data() is never undefined for query doc snapshots
        const message = { message: doc.data().message, time: doc.data().tiempo };
        messages.push(message);
      });
      dispatch({
        type: Actions.LOAD,
        carga: messages,
      });
    });
};
