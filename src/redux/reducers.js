import { combineReducers } from 'redux';
    
import reducerHome from '../screens/feed/reducer';
    
const combineReducer = combineReducers({
    reducerHome,
});
    
export default combineReducer;