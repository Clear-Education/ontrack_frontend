import { combineReducers } from 'redux'
import userReducer from '../reducers/userReducer'
import trackingReducer from './trackingReducer';
import trackingSolicitudReducer from './trackingSolicitudReducer';

export default combineReducers({
    user: userReducer,
    tracking: trackingReducer,
    trackingSolicitud: trackingSolicitudReducer
});