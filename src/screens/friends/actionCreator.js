import Actions from '../../redux/actionTypes';
    
export const FriendsInputUpdate = ({ prop, value }) => ({
type: Actions.ACTUALIZARINPUT,
payload: { prop, value },
});