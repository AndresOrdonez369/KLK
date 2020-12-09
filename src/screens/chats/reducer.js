import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  chatList: [],
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.GET_CHATS:
      return { ...state, chatList: [...state.chatList, action.payload] };
    case Actions.LAST_MESSAGE_SENT:
      return {
        ...state,
        chatList: state.chatList
          .map((chat) => action.payload.find((i) => i.uid === chat.uid) || chat),
      };
    default:
      return { ...state };
  }
};
