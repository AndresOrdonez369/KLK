/* eslint-disable import/prefer-default-export */
import Actions from '../../redux/actionTypes';

export const idUpdate = (id) => ({
  type: Actions.UPDATE_AUDIO_ID,
  payload: id,
});
