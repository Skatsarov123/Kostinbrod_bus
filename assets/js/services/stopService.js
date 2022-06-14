import * as request from './requester';


const baseUrl = 'http://localhost:8000/stops';

export const getAll = () => request.get(`${baseUrl}/allStops`);

export const create = async (stopData,token) => {


    let response = await fetch(`${baseUrl}/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({...stopData})
    });

    let result = await response.json();

    return result;
};

export const update = async  (stopId,token,stopData) => {


    let response = await fetch(`${baseUrl}/update/${stopId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({...stopData})
    });

    let result = await response.json();

    return result;
};


export const getBy =  (scheduleStopsIds, signal) => {

    return fetch(`${baseUrl}/getBy/${scheduleStopsIds}`, { signal })

        .then(res => res.json())


};

export const getOne =   (stopId, signal) => {

    return fetch(`${baseUrl}/getOne/${stopId}`, { signal })

        .then(res => res.json())

};

export const destroy = (stopId, token) => {
    return fetch(`${baseUrl}/delete/${stopId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    }).then(res => res.json());
};


