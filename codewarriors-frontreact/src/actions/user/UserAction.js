import {FACIAL_AUTHENTICATION, GET_COVID19_DATA, LOGIN_ACTION, LOGOUT_ACTION} from "./UserTypes";
import axios from "axios"

export function loginAction(credentials) {
    return async function (dispatch) {
        await axios.post('http://localhost:3000/users/login', credentials)
            .then((response) => {
                console.log(response.data);
                let status = {connected: false, role: "ANONYMOUS"};
                if (response.data.success) {
                    status.connected = true;
                    status.role = response.data.user.role;
                    const session = {
                        token: response.data.token,
                        user: response.data.user
                    };
                    localStorage.setItem('currentUser', JSON.stringify(session));
                }
                dispatch({
                    type: LOGIN_ACTION,
                    payload: status
                });
            });
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT_ACTION,
        user_connected: false,
        role: "ANONYMOUS"
    };
};


export const setUserConnected = (user) => {
    return {
        type: FACIAL_AUTHENTICATION,
        user_connected: true,
        role: user.role
    }

};
