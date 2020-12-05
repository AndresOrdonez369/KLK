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
    }))
    .catch(() => dispatch({
      type: Actions.SUBMIT_COMMENT_ERROR,
      payload: 'Hubo un error publicando el comentario.',
    }));
};

export const getComments = (authorID, pid) => async (dispatch) => {
  console.log(authorID, pid, '¿ estoy entrandoooooooooooooooooooooo???????');
  const db = firebase.firestore();
  await db.collection('posts').doc(authorID).collection('userPosts').doc(pid)
    .collection('comments')
    .get()
    .then((comments) => {
      console.log('aaaaaaaaaaaaaaaaaaaaaacomente');
      comments.forEach(async (comment) => {
        console.log('entre o nooooooooooooooooooo');
        const dataComment = comment.data();
        console.log(dataComment.createdAt, 'holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        /* const [hour, minute] = new Date(parseInt(dataComment.createdAt, 10))
        .toLocaleTimeString('en-US').split(/:| /);
         */
        /*  console.log(hour, minute, 'holaaaaaaaaaaaaaaaaa'); */
        const commentResume = {
          name: dataComment.authorName,
          comment: dataComment.comment,
          urlImage: dataComment.imageUrl,
          /*  hour: `${hour}:${minute}`, */
          cid: comment.id,
        };
        console.log(commentResume, 'este es el comment resume, y de esto depende mucho');
        dispatch({
          type: Actions.GET_COMMENTS,
          payload: commentResume,
        });
      });
    });
};
