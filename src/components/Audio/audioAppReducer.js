import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  aid: '',
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.UPDATE_AUDIO_ID:
      return { ...state, aid: action.payload };
    default:
      return { ...state };
  }
};
