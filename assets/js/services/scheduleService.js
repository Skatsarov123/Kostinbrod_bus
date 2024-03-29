import * as request from './requester';


const baseUrl = 'http://localhost:8000/schedule';

export const getAll = () => request.get(`${baseUrl}/allSchedules`);

export const create = async (scheduleData,token) => {

    let response = await fetch(`${baseUrl}/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({...scheduleData})
    });

    let result = await response.json();

    return result;
};

export const update = async  (scheduleId,token,scheduleData) => {


    let response = await fetch(`${baseUrl}/update/${scheduleId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({...scheduleData})
    });

    let result = await response.json();

    return result;
};


export const getOne = (scheduleId, signal) => {

    return fetch(`${baseUrl}/getOne/${scheduleId}`, { signal })

        .then(res => res.json())

};

export const destroy = (scheduleId, token) => {
    return fetch(`${baseUrl}/delete/${scheduleId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    }).then(res => res.json());
};
