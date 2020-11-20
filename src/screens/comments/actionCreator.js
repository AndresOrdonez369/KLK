import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';

export const submitComment = (comment, uid, name, imageUrl, pid) => async (dispatch) => {
  const createdAt = Date.now();
  const db = firebase.firestore();
  const data = {
    authorID: uid,
    authorName: name,
    imageUrl,
    comment,
    createdAt,
  };
  await db.collection('posts').doc(uid).collection('userPosts').doc(pid)
    .collection('comments')
    .add(data)
    .then(() => dispatch({
      type: Actions.SUBMIT_COMMENT_SUCCESS,
      message: 'Comentario publicado correctamente.',
      payload: data,
    }))
    .catch(() => dispatch({
      type: Actions.SUBMIT_COMMENT_ERROR,
      payload: 'Hubo un error publicando el comentario.',
    }));
};
export const getComments = (authorID, pid) => async (dispatch) => {
  const db = firebase.firestore();
  await db.collection('posts').doc(authorID).collection('userPosts').doc(pid)
    .collection('comments')
    .get()
    .then((querySnapshot) => {
      const data = {};
      const comments = querySnapshot.data();
      console.log(data);
      return dispatch({
        type: Actions.GET_COMMENTS,
        payload: data,
      });
    });
};
