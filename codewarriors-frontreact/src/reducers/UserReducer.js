import {FACIAL_AUTHENTICATION, LOGIN_ACTION, LOGOUT_ACTION} from "../actions/user/UserTypes";

const initialState = {
    user_connected: false,
    role: "ANONYMOUS",
};
const session = JSON.parse(localStorage.getItem('currentUser'));
if (session !== null) {
    initialState.user_connected = true;
    initialState.role = session.user.role;
    console.log(session);
}
export default function UserReducer(state = initialState, action) {
    switch (action.type) {

        case LOGIN_ACTION:
            if (!initialState.user_connected)
                return {
                    ...state,
                    user_connected: action.payload.connected,
                    role: action.payload.role
                };
            else
                return state;
        case LOGOUT_ACTION:
            let session = JSON.parse(localStorage.getItem('currentUser'));
            console.log(session);
            localStorage.removeItem('currentUser');
            console.log(action);
            return {
                user_connected: action.user_connected,
                role: action.role
            };
        case FACIAL_AUTHENTICATION:
            return {
                user_connected: action.user_connected,
                role: action.role
            };
        default:
            return state;
    }
}
