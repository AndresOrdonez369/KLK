import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

const db = firebase.firestore();

const getChats = (uid) => async (dispatch) => {
  if (uid !== '') {
    await db.collection('chats').where('users', 'array-contains', uid)
      .get()
      .then((chats) => {
        chats.forEach(async (chat) => {
          const fui = chat.data().users;
          let fuid = '';
          if (fui[0] === uid) {
            fuid = fui[1];
          } else {
            fuid = fui[0];
          }
          const [hour, minute] = new Date(parseInt(chat.data().lastUpdate, 10)).toLocaleTimeString('en-US').split(/:| /);
          const pathReference = await firebase.storage().ref(`/Users/profilePhotos/${fuid}.png`);
          const url = await pathReference.getDownloadURL();
          const userDocument = await db.collection('users').doc(fuid).get();
          const chatResume = {
            name: userDocument.data().name,
            message: chat.data().lastMessage,
            hour: `${hour}:${minute}`,
            urlImage: url,
            uid: fuid,
          };
          dispatch({
            type: Actions.GET_CHATS,
            payload: chatResume,
          });
        });
      });
  }
};

export default getChats;
