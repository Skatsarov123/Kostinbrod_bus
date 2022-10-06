import React, {useState} from "react";
import {Link} from 'react-router-dom';
import useScheduleTimeState from "../../hooks/useScheduleTimeState";
import useInitialState from "../../hooks/useInitialState";

const ScheduleTimePanel = () => {
    const [schedules, setSchedules] = useInitialState();
    const [scheduleTime, setScheduleTime] = useScheduleTimeState([])


    return (
        <>
            <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5" >Меню разписание</h3>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col"
                                                className="text-lg font-medium text-black-500 px-6 py-4 ">
                                               Име на линия
                                            </th>
                                            <th scope="col"
                                                className=" text-black-900 px-6 py-4 ">
                                                Тръгване от
                                            </th>
                                            <th scope="col"
                                                className=" text-black-900 px-6 py-4 ">
                                                Час на тръгване
                                            </th>
                                            <th scope="col"
                                                className=" text-black-900 px-6 py-4 ">

                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <th className="text-lg">
                                            {schedules.name}
                                        </th>
                                        {scheduleTime.map((s, index) => {


                                            return <tr key={index}>

                                                <th   className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {s.schedule_name}
                                                </th>
                                                <th   className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {s.place}
                                                </th>
                                                <th id="scheduleTime"  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {s.departure_time.join('\n')}
                                                </th>
                                                <th id="isHoliday" className="text-lg" >
                                                    {s.isHoliday}
                                                </th>
                                                <th className="flex-row">

                                                    <Link className="button"
                                                          to={`/edit/${s.id}`}>
                                                        <svg
                                                            className=" h-10 w-10 text-red-500"
                                                            fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor">
                                                            <path strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
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

export default ScheduleTimePanel;