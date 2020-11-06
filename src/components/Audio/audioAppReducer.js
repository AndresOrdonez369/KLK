import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  source: '',
  playerAction: 'pause',
  audioObj: null,
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.UPDATE_SOURCE:
      return { ...state, source: action.payload };
    case Actions.UPDATE_PLAYER_ACTION:
      return { ...state, playerAction: action.payload };
    case Actions.AUDIO_OBJ_UPDATE:
      return { ...state, audioObj: action.payload };
    default:
      return { ...state };
  }
};
