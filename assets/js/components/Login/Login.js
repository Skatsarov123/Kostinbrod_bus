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
        <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <div className="w-full sm:max-w-md p-5 mx-auto">

                <form id="login-form" onSubmit={onLoginHandler} method="POST">
                    <div className="mb-4">
                        <label className="block mb-1" >Username</label>
                        <input id="email" type="text" name="username" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" >Password</label>
                        <input id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                    </div>
                    <div className="mt-6">
                        <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Влез</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;