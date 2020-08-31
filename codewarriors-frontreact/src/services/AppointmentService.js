import axios from 'axios';

export function fetchAppointments(id) {
    return axios.get('http://localhost:3000/appointment/get-by-user/' + id);
}

export function signAppointment(object, option) {
    return axios.post("http://localhost:3000/appointment/new", object, option);
}
