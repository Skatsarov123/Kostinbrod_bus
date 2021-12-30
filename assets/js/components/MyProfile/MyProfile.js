import { useState, useEffect } from 'react';
import React from "react";
import * as authService from '../../services/authService';

const MyProfile = () => {
    const [user, setUser] = useState([]);


    useEffect(() => {
        authService.profile(user._id)
            .then(userResult => {
                setUser(userResult);
            });
    }, []);
    return (
        <section id="my-pets-page" className="my-pets">
            <h1>My Profile</h1>

          Name={user.username}
        </section>
    );
}

export default MyProfile;