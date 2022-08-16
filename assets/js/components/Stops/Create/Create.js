import React, {useRef, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import * as stopService from '../../../services/stopService';
import {useAuthContext} from '../../../contexts/AuthContext';

const StopCreate = () => {

    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const formRef = useRef();

    const onStopCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let name = formData.get('name');
        let latitude = formData.get('latitude');
        let longitude = formData.get('longitude');


        stopService.create({
            name,
            latitude,
            longitude

        }, user.token)
            .then(result => {
                navigate('/stops');
            })
    }

    return (

        <section id="create-page" className="create">
            <>
                <h3 className="bg-gradient-to-r from-red-500 text-6xl  flex justify-center content-center text-white w-full py-5 my-5">Добави спирка</h3>
                <div className='flex justify-center place-items-center gap-6 py-5 '>
                    <form id="create-form" onSubmit={onStopCreate} method="POST">
                        <div>
                            <label className="flex justify-center content-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-96">Име</label>
                            <input type="text" name="name" id="name"
                                   className=" text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Kostinbrod - Sofia"/>
                        </div>
                        <div>
                            <label className="flex justify-center content-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ширина</label>
                            <input type="text" name="latitude" id="latitude"
                                   className=" text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="42.741173797992744"/>
                        </div>
                        <div>
                            <label className="flex justify-center content-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Дължина</label>
                            <input type="text" name="longitude" id="longitude"
                                   className=" text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="23.28697396123882"/>
                        </div>
                        <div className=" flex justify-center content-center">
                            <button type="submit">
                                <svg className="h-10 w-10 text-green-500" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </button>
                            <Link to="/stops">
                                <svg className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                            </Link>
                        </div>
                    </form>
                </div>


            </>
        </section>
    );

}

export default StopCreate;
