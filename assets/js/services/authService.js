
const baseUrl = 'http://localhost:8000/api';

export const login = async (username, password) => {
    let res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
};

    export const profile = async (token) => {
        let auth =  localStorage.getItem('user');
        let res = await fetch(`${baseUrl}/profile`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': auth
            },
            body: JSON.stringify({ auth})

        });
            let jsonResult = await res.json();

            console.log(jsonResult)
    };

export const register = (username, password,name) => {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password, name })
    })

        .then(res => res.json());


};

export const logout = (token) => {
    return fetch(`${baseUrl}/logout`, {
        headers: {
            'X-Authorization': token,
        }
    })
};

export const getUser = () => {
    let username = localStorage.getItem('username');

    return username;
};

export const isAuthenticated = () => {
    return Boolean(getUser())

};
