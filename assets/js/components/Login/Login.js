import { useNavigate } from 'react-router-dom';
import React from "react";
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import * as authService from '../../services/authService';

const Login = () => {
    const { login } = useAuthContext();
    const { addNotification }  = useNotificationContext();
    const  navigate  = useNavigate();

    const onLoginHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let username = formData.get('username');
        let password = formData.get('password');

        authService.login(username, password)
            .then((authData) => {
                login(authData);
                addNotification('You logged in successfully', types.success);
                navigate('/');

            })
            .catch(err => {
                // TODO: show notification
                console.log(err);
            });
    }

    return (
        <section id="login-page" className="login">
            <form id="login-form" onSubmit={onLoginHandler} method="POST">
                <fieldset>
                    <legend>Login Form</legend>
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
                    <input className="button submit" type="submit" value="Login" />
                </fieldset>
            </form>
        </section>
    );
}

export default Login;