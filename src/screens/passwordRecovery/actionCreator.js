import Actions from '../../redux/actionTypes';
    
export const PassRecoveryInputUpdate = ({ prop, value }) => ({
type: Actions.ACTUALIZARINPUT,
payload: { prop, value },
});