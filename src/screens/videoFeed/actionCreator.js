import Actions from '../../redux/actionTypes';
    
export const VideoFeedInputUpdate = ({ prop, value }) => ({
type: Actions.ACTUALIZARINPUT,
payload: { prop, value },
});