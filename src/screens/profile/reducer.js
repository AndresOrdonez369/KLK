import Actions from '../../redux/actionTypes';

const STATE_INICIAL = {
  user: {
    coverURL: '',
    name: '',
    userName: '',
    description: '',
    followers: {},
    following: {},
    qFollowers: 0,
    qFollowing: 0,
  },
  imageURL: '',
  uploadPhotoError: '',
  isLoading: '',
  error: false,
  message: '',
  uid: '',
  email: '',
  modalType: '',
  dataChange: false,
  anotherUser: {
    coverURL: '',
    name: '',
    userName: '',
    description: '',
    imageURL: '',
    following: '',
    followers: '',
    qFollowers: 0,
    qFollowing: 0,
  },
  postList: [],
  extraUserPosts: [],
};

export default (state = STATE_INICIAL, action) => {
  switch (action.type) {
    case Actions.GET_POSTS_PROFILE:
      return { ...state, postList: [...state.postList, action.payload] };
    case Actions.GET_EXTRA_USER_POSTS:
      return { ...state, extraUserPosts: [...state.extraUserPosts, action.payload] };
    case Actions.SIGN_OUT:
      return STATE_INICIAL;
    case Actions.UPDATE_DESCRIPTION_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          description: action.payload,
        },
      };
    case Actions.SET_LOADER_PROFILE:
      return { ...state, isLoading: action.payload };
    case Actions.USER_FETCH_FAILED:
      return {
        ...state,
        message: action.payload,
      };
    case Actions.USER_FETCH_DBASE:
      return {
        ...state,
        error: false,
        uid: action.payload.uid,
        email: action.payload.email,
        imageURL: action.payload.photoURL,
        user: {
          ...state.user,
          name: action.payload.name,
          userName: action.payload.userName,
          description: action.payload.description,
          coverURL: action.payload.coverURL,
        },
      };
    case Actions.USER_DB_UPDATE:
      return { ...state, error: false };
    case Actions.USER_UPDATE_IMAGEN_URL:
      return {
        ...state,
        imageURL: action.payload,
      };
    case Actions.USER_UPDATE_COVER_URL:
      return {
        ...state,
        user: {
          ...state.user,
          coverURL: action.payload,
        },
      };
    case Actions.USER_UPDATE_IMAGEN_ERROR:
      return {
        ...state,
        uploadPhotoError: action.payload,
      };
    case Actions.SHOW_MODAL_PROFILE:
      return {
        ...state,
        error: true,
        message: action.payload.message,
        modalType: action.payload.type,
      };
    case Actions.HIDE_MODAL_PROFILE:
      return {
        ...state,
        error: false,
      };
    case Actions.SET_DATA_CHANGE:
      return { ...state, dataChange: action.payload };
    case Actions.ANOTHER_USER_FETCH:
      return {
        ...state,
        error: false,
        anotherUser: {
          ...state.anotherUser,
          name: action.payload.name,
          userName: action.payload.userName,
          description: action.payload.description,
          coverURL: action.payload.coverURL,
          imageURL: action.payload.imageURL,
          uid: action.payload.uid,
        },
      };
    case Actions.CLEAN_EXTRA_PROFILE:
      return { ...state, anotherUser: STATE_INICIAL.anotherUser };
    case Actions.FOLLOW_SOMEONE:
      return {
        ...state,
        user: {
          ...state.user,
          following: {
            ...state.user.following,
            [action.payload.uid]: {
              name: action.payload.name,
              userName: action.payload.userName,
              imageURL: action.payload.imageURL,
            },
          },
          qFollowing: state.user.qFollowing + 1,
        },
        anotherUser: {
          ...state.anotherUser,
          qFollowers: state.anotherUser.qFollowers + 1,
        },
      };
    case Actions.UNFOLLOW_SOMEONE:
      // eslint-disable-next-line no-param-reassign
      delete state.user.following[action.payload];
      return {
        ...state,
        user: {
          ...state.user,
          qFollowing: state.user.qFollowing - 1,
        },
        anotherUser: {
          ...state.anotherUser,
          qFollowers: state.anotherUser.qFollowers - 1,
        },
      };
    case Actions.GET_FOLLOWERS:
      return {
        ...state,
        anotherUser: {
          ...state.anotherUser,
          followers: {
            ...state.anotherUser.followers,
            [action.payload.uid]: {
              name: action.payload.name,
              userName: action.payload.userName,
              imageURL: action.payload.imageURL,
            },
          },
        },
      };
    case Actions.GET_FOLLOWINGS:
      return {
        ...state,
        anotherUser: {
          ...state.anotherUser,
          following: {
            ...state.anotherUser.following,
            [action.payload.uid]: {
              name: action.payload.name,
              userName: action.payload.userName,
              imageURL: action.payload.imageURL,
            },
          },
        },
      };
    case Actions.GET_MY_FOLLOWINGS:
      return {
        ...state,
        user: {
          ...state.user,
          following: {
            ...state.user.following,
            [action.payload.uid]: {
              name: action.payload.name,
              userName: action.payload.userName,
              imageURL: action.payload.imageURL,
            },
          },
        },
      };
    case Actions.GET_MY_FOLLOWERS:
      return {
        ...state,
        user: {
          ...state.user,
          followers: {
            ...state.user.followers,
            [action.payload.uid]: {
              name: action.payload.name,
              userName: action.payload.userName,
              imageURL: action.payload.imageURL,
            },
          },
        },
      };
    case Actions.SET_MY_FOLLOWERS:
      return {
        ...state,
        user: {
          ...state.user,
          qFollowers: action.payload,
        },
      };
    case Actions.SET_MY_FOLLOWINGS:
      return {
        ...state,
        user: {
          ...state.user,
          qFollowings: action.payload - 1,
        },
      };
    case Actions.SET_FOLLOWINGS:
      return {
        ...state,
        anotherUser: {
          ...state.anotherUser,
          qFollowings: action.payload - 1,
        },
      };
    case Actions.SET_FOLLOWERS:
      return {
        ...state,
        anotherUser: {
          ...state.anotherUser,
          qFollowers: action.payload,
        },
      };
    case Actions.SET_NEW_VIDEOPOST:
    case Actions.SET_NEW_POST:
      return {
        ...state,
        postList: [...state.postList, action.payload],
      };
    default:
      return { ...state };
  }
};
