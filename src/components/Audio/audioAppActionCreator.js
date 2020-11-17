/* eslint-disable import/prefer-default-export */
import Actions from '../../redux/actionTypes';

export const playerUpdate = (action) => ({
  type: Actions.UPDATE_PLAYER_ACTION,
  payload: action,
});

export const audioObjUpdate = (obj) => ({
  type: Actions.AUDIO_OBJ_UPDATE,
  payload: obj,
});
