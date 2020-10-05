import Actions from '../../redux/actionTypes';
    
export const PostInputUpdate = ({ prop, value }) => ({
type: Actions.ACTUALIZARINPUT,
payload: { prop, value },
});