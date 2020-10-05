import { createStore, applyMiddleware } from 'redux';
import  thunkMiddleware  from 'redux-thunk';
import Reducers from './reducers';
    
export default store = createStore(Reducers, applyMiddleware(thunkMiddleware));