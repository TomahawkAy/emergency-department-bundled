import axios from 'axios';
const URL='http://localhost:3000';
const STAFF_ENDPOINT='/staff';
export  async function getCOVID19Data() {
    return  axios.get('https://api.covid19api.com/country/Tunisia/status/confirmed/live');
}

export async function retreiveUsers(){
    return axios.get('localhost:3000/users/get-all');
}

export  function newPersonnel(options,body) {
return axios.post(URL+STAFF_ENDPOINT+'/new',body,options);
}
export function retreivePersonnels(options){
return axios.get('http://localhost:3000/staff/all',options);
}

export function deletePersonnel(options,body){
    return axios.post(URL+STAFF_ENDPOINT+'/delete',body,options);
}
