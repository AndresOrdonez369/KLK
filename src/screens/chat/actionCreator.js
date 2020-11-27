import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const sendMessageDB = (message, image, video, uid, userName, docID) => async (dispatch) => {
  const db = firebase.firestore();
  const chatCollection = db.collection('chats').doc(docID).collection('messages');
  const msg = {
    message,
    image,
    video,
    userName,
    authorID: uid,
    createdAt: Date.now(),
  };
  await chatCollection.add(msg)
    .then(() => dispatch({
      type: Actions.MESSAGE_SENT,
      payload: msg,
    }))
    .catch((error) => {
      console.log('error enviando el mensaje', error);
      return dispatch({
        type: Actions.SEND_MESSAGE_ERROR,
        payload: 'Hubo un error enviando el mensaje, inténtelo nuevamente',
      });
    });
};

// eslint-disable-next-line consistent-return
export const getMessages = (myUid, uid) => async (dispatch) => {
  try {
    const id1 = `${myUid}${uid}`;
    const id2 = `${uid}${myUid}`;
    const chatCollection = firebase.firestore().collection('chats');
    await chatCollection.where('docID', 'array-contains', id1).get()
      .then(async (querySnapshot) => {
        if (querySnapshot.empty) {
          await chatCollection.add({
            docID: [id1, id2],
            users: [myUid, uid],
          })
            .then(async () => {
              await chatCollection.where('docID', 'array-contains', id1).get()
                .then((query) => {
                  query.forEach(async (doc) => {
                    dispatch({
                      type: Actions.SET_DOC_ID,
                      payload: doc.id,
                    });
                    await dispatch(chatMessages(doc.id));
                  });
                });
            });
        } else {
          querySnapshot.forEach(async (doc) => {
            dispatch({
              type: Actions.SET_DOC_ID,
              payload: doc.id,
            });
            await dispatch(chatMessages(doc.id));
          });
        }
      });
  } catch (error) {
    console.log('error getting messages', error);
    return dispatch({
      type: Actions.CHAT_ERROR,
      payload: 'Hubo un error accediendo a la información de este chat, inténtalo nuevamente',
    });
  }
};

const chatMessages = (docID) => async (dispatch) => {
  const messages = firebase.firestore().collection('chats').doc(docID).collection('messages');
  await messages.orderBy('createdAt', 'desc').limit(20).onSnapshot((snapshot) => {
    const msgs = [];
    snapshot.docs.forEach((doc) => {
      const msg = doc.data();
      msgs.push(msg);
    });
    return dispatch({
      type: Actions.GET_MESSAGES,
      payload: msgs,
    });
  });
};
