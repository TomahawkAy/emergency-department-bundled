import axios from 'axios';

const URL = 'http://localhost:3000';
const SCHEDULE_ENDPOINT = '/department';

export function newDepartment(object, option) {
    return axios.post(URL + SCHEDULE_ENDPOINT + '/new', object, option);
}

export function fetchDepartments(option) {
    return axios.get(URL + SCHEDULE_ENDPOINT + '/all', option);
}


export function deleteDepartment(object, option) {
    return axios.post(URL + SCHEDULE_ENDPOINT + '/delete', object, option);
}
