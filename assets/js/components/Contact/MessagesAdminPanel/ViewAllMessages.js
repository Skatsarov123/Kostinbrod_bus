import React, {useEffect, useState} from "react";
import * as contactService from "../../../services/contactService";
import {Link} from "react-router-dom";

const ViewAllMessages = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {

        contactService.getAll()
            .then(result => {
                setMessages(result)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <>
            <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5">Меню
                Съобщения</h3>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col"
                            className="text-lg font-medium text-black-500 px-6 py-4 ">
                            Име
                        </th>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">
                          Email
                        </th>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">
                            Телефон
                        </th>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">

                        </th>
                    </tr>
                    </thead>
                    <tbody>


                    {messages.map((s, index) => {


                        return <tr key={index}>

                            <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {s.name}
                            </th>
                            <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {s.email}
                            </th>
                            <th id="scheduleTime"
                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {s.phone}
                            </th>
                            <th className="flex-row">
                                <Link className="button"
                                      to={`/message/${s.id}`}>
                                    <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </Link>
                                <></>
                            </th>
                        </tr>;
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default ViewAllMessages;