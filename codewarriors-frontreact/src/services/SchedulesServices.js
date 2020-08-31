import axios from 'axios';

const URL = 'http://localhost:3000';
const SCHEDULE_ENDPOINT = '/schedule';

export function createSchedule(options, object) {
    return axios.post(URL + SCHEDULE_ENDPOINT + '/new', object, options);
}


export function fetchSchedules(options) {
    return axios.get(URL + SCHEDULE_ENDPOINT + '/all', options)
}


export function deleteSchedule(options, object) {
    return axios.post(URL + SCHEDULE_ENDPOINT + '/delete', object, options);
}
