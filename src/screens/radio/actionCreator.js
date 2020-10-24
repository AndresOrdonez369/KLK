import Actions from '../../redux/actionTypes';

export const RadioInputUpdate = ({ prop, value }) => ({
  type: Actions.ACTUALIZARINPUT,
  payload: { prop, value },
});
