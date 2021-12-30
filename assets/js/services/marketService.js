import * as request from './requester';

const baseUrl = 'http://localhost:8000/market';

export const getAll = () => request.get(`${baseUrl}/all`);

export const getMyPets = (ownerId) => {
    let query = encodeURIComponent(`_ownerId="${ownerId}"`);

    return request.get(`${baseUrl}/pets?where=${query}`);
};

export const create = async (marketData,token) => {
    console.log(token)
    let response = await fetch(`${baseUrl}/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({...marketData})
    });

    let result = await response.json();

    return result;
};

export const update = (marketId, marketData) => request.put(`${baseUrl}/market/${marketId}`, marketData);

export const getOne = (petId, signal) => {
    return fetch(`${baseUrl}/pets/${petId}`, { signal })
        .then(res => res.json())
};

export const destroy = (petId, token) => {
    return fetch(`${baseUrl}/pets/${petId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());
};

export const like = (petId, pet, token) => {
    return fetch(`${baseUrl}/pets/${petId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(pet)
    }).then(res => res.json());
};