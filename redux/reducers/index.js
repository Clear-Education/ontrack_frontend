import {combineReducers} from 'redux'
import userReducer from '../reducers/userReducer'
import trackingReducer from './trackingReducer';

export default combineReducers({
    user: userReducer,
    tracking: trackingReducer
});