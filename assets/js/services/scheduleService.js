import * as request from './requester';

const baseUrl = 'http://localhost:8000/schedule';

export const getAll = () => request.get(`${baseUrl}/all`);

export const getMyPets = (ownerId) => {
    let query = encodeURIComponent(`_ownerId="${ownerId}"`);

    return request.get(`${baseUrl}/schedule?where=${query}`);
};

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

export const update = (scheduleId, scheduleData) => request.put(`${baseUrl}/update/${scheduleId}`, scheduleData);


export const getOne = (scheduleId, signal) => {

    return fetch(`${baseUrl}/getOne/${scheduleId}`, { signal })

        .then(res => res.json())

};

export const destroy = (scheduleId, token) => {
    return fetch(`${baseUrl}/schedule/${scheduleId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());
};
