import Actions from '../../redux/actionTypes';

export const FeedInputUpdate = ({ prop, value }) => ({
type: Actions.ACTUALIZARINPUT,
payload: { prop, value },
});