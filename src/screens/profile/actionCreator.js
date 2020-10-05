import Actions from '../../redux/actionTypes';
    
export const ProfileInputUpdate = ({ prop, value }) => ({
type: Actions.ACTUALIZARINPUT,
payload: { prop, value },
});