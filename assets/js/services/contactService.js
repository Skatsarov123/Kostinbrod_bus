import * as request from './requester';

const baseUrl = 'http://localhost:8000/contact';


export const create = async (contactData) => {

    let response = await fetch(`${baseUrl}/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({...contactData})
    });

    let result = await response.json();

    return result;
};