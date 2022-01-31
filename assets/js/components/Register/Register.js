import { useNavigate } from 'react-router';
import React from "react";
import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';


const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();


    const registerSubmitHandler = (e) => {
        e.preventDefault();

        let { username, password,name } = Object.fromEntries(new FormData(e.currentTarget));

        authService.register(username, password, name)
            .then(authData => {
                login(authData);

                navigate('/');
            });
    }


    
    return (
        <section id="register-page" className="register">
            <form id="register-form" method="POST" onSubmit={registerSubmitHandler}>
                <fieldset>
                    <legend>Register Form</legend>
                    <p className="field">
                        <label htmlFor="username">Username</label>
                        <span className="input">
                            <input type="text" name="username" id="username" placeholder="Username" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="password">Password</label>
                        <span className="input">
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="repeat-pass">Repeat Password</label>
                        <span className="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="name">Name</label>
                        <span className="input">
                            <input type="text" name="name" id="name" placeholder="Name" />
                        </span>
                    </p>
                    <input className="button submit" type="submit" value="Register" />
                </fieldset>
            </form>
        </section>
    );
}

export default Register;