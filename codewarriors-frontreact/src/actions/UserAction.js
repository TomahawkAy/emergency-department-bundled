import httpClients from '../views/httpClient';
import axios from "axios";
import jwtDecode from 'jwt-decode'

export const LOADING_COMPLETE = () => {
    return {
        type: 'LOADING_COMPLETE',
    };
};
export const T_LOGIN = () => {
    return {
        type: 'T_LOGIN',
    };
};
export const T_REGISTER = () => {
    return {
        type: 'T_REGISTER',
    };
};

export const FORM_UPDATE = ({prop, value}) => {
    return {
        type: 'FORM_UPDATE',
        payload: {prop, value},
    };
};

export const LOGGED_IN = ({email, password}) => {
    localStorage.removeItem('token');

    return (dispatch) => {
        axios.post('http://localhost:3000/authenticate', {
            email: email,
            password: password
        })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                const data = httpClients.getJWTDecoded({token});
                dispatch({
                    type: 'LOGGED_IN',
                    payload: {token, data}
                });
            })
            .catch(error => console.log(error))
    };
};
export const REGISTER = ({name, email, password}) => {
    localStorage.removeItem('token');
    return (dispatch) => {
        axios.post('http://localhost:3000/', {
            name: name,
            email: email,
            password: password,
        })
            .then((response) => {
                const token = response.data.token
                localStorage.setItem('token', token);
                const data = httpClients.getJWTDecoded({token});
                dispatch({
                    type: 'REGISTER',
                    payload: {token, data}
                });
            })
            .catch(error => console.log(error))
    };
}

export const LOGGED_OUT = () => {
    localStorage.removeItem('token');
    return {
        type: 'LOGGED_OUT',
    };
};


export const REFRESH_TOKEN = () => {
    const token = localStorage.getItem('token');
    if (token) {
        if (new Date(jwtDecode(token).exp * 1000) < new Date()) {
            localStorage.removeItem('token');
            return (dispatch) => {
                axios.post('http://localhost:3000/refresh',{token:token})
                    .then((response) => {
                        const token = response.data.token;
                        localStorage.setItem('token', token);
                        const data = httpClients.getJWTDecoded({token});
                        dispatch({
                            type: 'REFRESH_TOKEN',
                            payload: {token, data}
                        });
                    })
                    .catch(error => console.log(error))
            }
        } else {
            const data = httpClients.getJWTDecoded({token});
            return {
                type: 'REFRESH_TOKEN',
                payload: {token,data}
            }
        }
    } else {
        return {
            type: 'LOGGED_OUT',
        };
    }

};

