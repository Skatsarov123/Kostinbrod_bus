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


export const getOne =  (scheduleStopsIds, signal) => {

    return fetch(`${baseUrl}/getOne/${scheduleStopsIds}`, { signal })

        .then(res => res.json())


};

export const destroy = (stopId, token) => {
    return fetch(`${baseUrl}/stop/${stopId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());

};


export const getByIds = async (scheduleStopsIds=[]) => {
    //put all promises in an Array so we can let them run and be awaited
    //await is bad practise in loops and usually does not work
    let requests = [];
    let responses = [];

    for (let id in scheduleStopsIds)
        requests.push(fetch(`${baseUrl}/getOne/${scheduleStopsIds}`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
            //Add response to array
            .then(response => responses.push(response))
            .catch(err => console.log(err)));

    //Await all requests
    await Promise.all(requests);

    //return all responses
    return responses;
}