import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {Link} from "react-router-dom";
import * as scheduleService from "../../services/scheduleService";



const AllSchedules = () => {

    const {user} = useAuthContext();
    const [schedules, setSchedules] = useState([]);
    useEffect(() => {

        scheduleService.getAll()
            .then(result => {
                setSchedules(result)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <>
            <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5">Меню линии
            </h3>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">
                            Име
                        </th>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">
                            Спирки
                        </th>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedules.map((x, i) => {
                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                            <th scope="row"
                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{x.name}
                            </th>
                            <th scope="row"
                                className="py-4 px-6 font-medium text-gray-900 whitespace-pre-wrap dark:text-white">{x.stops_names.join('\n')}
                            </th>
                            <th className=" px-6">
                                {user.username
                                    ? <Link to={`/schedule/editSchedule/${x.id}`} style={{paddingRight: '5px'}}>
                                        <svg className=" h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                        </svg>
                                    </Link>
                                    : <></>
                                }
                            </th>
                                <th>
                                < Link className="button"
                                       to={`/scheduleTime/${x.id}`}>
                                    <svg
                                        className="h-10 w-10 text-green-500"
                                        width="24" height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path stroke="none"
                                              d="M0 0h24v24H0z"/>
                                        <line x1="12" y1="5" x2="12"
                                              y2="19"/>
                                        <line x1="5" y1="12" x2="19"
                                              y2="12"/>
                                    </svg>
                                </Link>
                                </th>
                        </tr>;
                    })}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center place-items-center gap-6 py-5 '>

                <Link to="/schedules/create" >
                    <button  className="w-60 h-16 bg-red-500 text-white font-bold py-2 px-4 rounded">Добави линия</button >
                </Link>
            </div>
        </>
    );

}
export default AllSchedules;