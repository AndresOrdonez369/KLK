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
    .then((documentReference) => {
      const [hour, minute] = new Date(createdAt).toLocaleTimeString('en-US').split(/:| /);
      const commentProof = {
        name,
        comment,
        url: imageUrl,
        hour: `${hour}:${minute}`,
        cid: documentReference.id,
      };
      dispatch({
        type: Actions.SUBMIT_COMMENT_SUCCESS,
        message: 'Comentario publicado correctamente.',
        payload: commentProof,
      });
    })
    .catch(() => dispatch({
      type: Actions.SUBMIT_COMMENT_ERROR,
      payload: 'Hubo un error publicando el comentario.',
    }));
};

export const getComments = (authorID, pid) => async (dispatch) => {
  const db = firebase.firestore();
  await db.collection('posts').doc(authorID).collection('userPosts').doc(pid)
    .collection('comments')
    .orderBy('createdAt', 'desc')
    .get()
    .then((comments) => {
      comments.forEach(async (comment) => {
        const dataComment = comment.data();
        const [hour, minute] = new Date(parseInt(dataComment.createdAt, 10))
          .toLocaleTimeString('en-US').split(/:| /);
        const commentResume = {
          name: dataComment.authorName,
          comment: dataComment.comment,
          url: dataComment.imageUrl,
          hour: `${hour}:${minute}`,
          cid: comment.id,
        };
        dispatch({
          type: Actions.GET_COMMENTS,
          payload: commentResume,
        });
      });
    });
};

export const updateCleanComments = () => ({
  type: Actions.UPDATE_CLEAN_COMMNET,
});
