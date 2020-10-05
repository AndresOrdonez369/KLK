import Actions from '../../redux/actionTypes';
    
export const RegistryInputUpdate = ({ prop, value }) => ({
type: Actions.ACTUALIZARINPUT,
payload: { prop, value },
});