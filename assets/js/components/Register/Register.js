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

        authService.register(username, password,name)
            .then(authData => {
                login(authData);

                navigate('/');
            });
    }


    
    return (

        <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5">Регистрация</h3>
            <div className="w-full sm:max-w-md p-5 mx-auto">

                <form id="login-form" onSubmit={registerSubmitHandler} method="POST">
                    <div className="mb-4">
                        <label className="block mb-1" >Username</label>
                        <input id="username" type="text" name="username" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" >Password</label>
                        <input id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" >Repeat Password</label>
                        <input id="repeat_pass" type="password" name="confirm-pass" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" >Name</label>
                        <input id="name" type="text" name="name" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                    </div>
                    <div className="mt-6">
                        <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Регистрирай</button>
                    </div>


                </form>
            </div>
        </div>
    );
}

export default Register;