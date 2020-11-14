import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const Send = (texto, nick, user) => async (dispatch) => {
  const time = new Date().getTime();
  await firebase.firestore().collection('radios').doc('yLPys4sma3xh3zksZKrc').collection('chat')
    .add({
      timePrueba: firebase.firestore.FieldValue.serverTimestamp(),
      authorNickname: nick,
      authorID: user,
      timestamp: time,
      text: texto,
    })
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
  const query = firebase.firestore()
    .collection('radios').doc('yLPys4sma3xh3zksZKrc').collection('chat')
    .orderBy('timestamp', 'desc')
    .limit(20);
  await query.onSnapshot((snapshot) => {
    const messages = [];
    snapshot.docs.forEach((doc) => {
      function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      const message = doc.data();
      const message0 = {
        message: message.text,
        time: message.timestamp,
        name: message.authorNickname,
        color: getRandomColor(),
        uid: message.authorID,
      };
      messages.push(message0);
    });
    return dispatch({
      type: Actions.LOAD,
      carga: messages,
    });
  });
};
