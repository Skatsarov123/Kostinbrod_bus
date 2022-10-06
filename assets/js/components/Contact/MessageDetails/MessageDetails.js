import React, {useEffect, useState} from "react";
import * as contactService from "../../../services/contactService";
import {Link, useParams} from "react-router-dom";



const MessageDetails = () => {
    const [message, setMessage] = useState([]);
    const { messageId } = useParams();

    useEffect (() => {
        contactService.getOne(messageId)
            .then(messageResult => {
                setMessage(messageResult);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <>

            <div className="px-2 md:px-6 my-3 w-full text-slate-700 dark:text-white flex flex-col items-center">
                <div className="max-w-xl text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-slate-600 rounded-xl">
                    <div
                        className="w-full rounded-xl flex-col xl:flex-row bg-white dark:bg-slate-900 shadow-md">
                        <div className="w-full p-3 flex flex-col justify-between h-auto overflow-auto lg:h-auto">
                            <h1 className="text-left text-sm md:text-lg font-bold leading-normal">
                                {message.name}
                            </h1>
                            <p className="text-sm"> {message.message}</p>

                            <div className="flex mt-4">
                                <div className="flex flex-col ml-4 w-1/2">
                                    <h2 className="text-center text-xs mt-1 mb-2 text-black-600 dark:text-blue-400 font-bold uppercase">
                                        {message.email}
                                    </h2>

                                </div>
                                <div className="flex flex-col ml-4 w-1/2">
                                    <h2 className="text-center text-xs mt-1 mb-2 text-black-600 dark:text-blue-400 font-bold uppercase">
                                        {message.phone}
                                    </h2>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/view_all_messages">
                    <svg className="h-10 w-10 text-red-500  mt-4" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                </Link>
            </div>

        </>
    );
}
export default MessageDetails;