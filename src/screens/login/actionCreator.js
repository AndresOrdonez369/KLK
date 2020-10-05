import Actions from '../../redux/actionTypes';
    
export const LoginInputUpdate = ({ prop, value }) => ({
type: Actions.ACTUALIZARINPUT,
payload: { prop, value },
});