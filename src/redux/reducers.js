import { combineReducers } from 'redux';
import reducerHome from '../screens/feed/reducer';
import reducerFriends from '../screens/friends/reducer';
import reducerLogin from '../screens/login/reducer';
import reducerPasswordRecovery from '../screens/passwordRecovery/reducer';
import reducerPost from '../screens/post/reducer';
import reducerProfile from '../screens/profile/reducer';
import reducerRadio from '../screens/radio/reducer';
import reducerRegistry from '../screens/registry/reducer';
import reducerVideoFeed from '../screens/videoFeed/reducer';
import reducerSettings from '../screens/settings/reducer';

const combineReducer = combineReducers({
  reducerHome,
  reducerFriends,
  reducerLogin,
  reducerPasswordRecovery,
  reducerPost,
  reducerProfile,
  reducerRadio,
  reducerRegistry,
  reducerVideoFeed,
  reducerSettings,
});

export default combineReducer;
