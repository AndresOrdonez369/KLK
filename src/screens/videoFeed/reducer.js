import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  postList: [],
  postCreated: false,
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.GET_VIDEO_POSTS:
      return { ...state, postList: [...state.postList, action.payload] };
    case Actions.SET_NEW_VIDEOPOST:
      return {
        ...state,
        postCreated: true,
        postList: [...state.postList, action.payload],
      };
    default:
      return { ...state };
  }
};
