import Actions from '../../redux/actionTypes';
    
export const passwordRecovery = (emailAddress) => (dispatch) => {
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress).then(() => dispatch({
      type: Actions.PASSWORD_RECOVERY,
    })).catch(() => ({
      type: Actions.PASSWORD_ERROR,
    }));
  };
  
