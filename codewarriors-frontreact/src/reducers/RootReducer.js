import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import PositionReducer from './PositionReducer'
import NurceAmbulanceReducer from './NurceAmbulanceReducer'
import DriverAmbulanceReducer from './DriverAmbulanceReducer'
import NotifReducer from './NotifReducer'
import AdminAmbulanceReducer from './AdminAmbulanceReducer'
import io from 'socket.io-client'
import {notificationReducer} from "./NotificationReducer";
import scheduleReducer from "./ScheduleReducer";

const root = (state = {socket: io.connect("http://localhost:8000")}, action) => {
    return state;
};

export default combineReducers({
    root,
    notificationReducer: notificationReducer,
    UserReducer, PositionReducer, NurceAmbulanceReducer,NotifReducer,DriverAmbulanceReducer,AdminAmbulanceReducer
})
