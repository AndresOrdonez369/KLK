import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  chatList: [],
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.GET_CHATS:
      return { ...state, chatList: [...state.chatList, action.payload] };
    default:
      return { ...state };
  }
};
