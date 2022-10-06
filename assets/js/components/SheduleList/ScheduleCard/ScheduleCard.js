
import React, {useEffect, useRef, useState} from "react";
import useScheduleTimeState from '../../../hooks/useScheduleTimeState';
import {useAuthContext} from "../../../contexts/AuthContext";
import Maps from "../../Map/Maps";
import {Switch} from '@headlessui/react'
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import 'leaflet/dist/leaflet.css';


const ScheduleCard = ({schedule}) => {

    const ref = useRef();
    const {user} = useAuthContext();
    const [scheduleTime, setScheduleTime] = useScheduleTimeState([])
    const [toggle, setToggle] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [enabled, setEnabled] = useState(false)

    const handleChange = () => {
        toggle ? setToggle(false) : setToggle(true);
    };

    useOnClickOutside(ref, () => setShowModal(false));

    function useOnClickOutside(ref, handler) {
        useEffect(
            () => {
                const listener = (event) => {
                    // Do nothing if clicking ref's element or descendent elements
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                    handler(event);
                };
                document.addEventListener("mousedown", listener);
                document.addEventListener("touchstart", listener);
                return () => {
                    document.removeEventListener("mousedown", listener);
                    document.removeEventListener("touchstart", listener);
                };
            },
            [ref, handler]
        );
    }

    return (
        <>
            <button
                className='w-60 h-16  flex items-center justify-center    cursor-pointer rounded-md  bg-red-500 text-white'
                type="button"

                onClick={() => setShowModal(true)}>{schedule.name}</button>

            {showModal ? (
                <>

                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>


                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div
                            className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

                            <div className="flex flex-row justify-center items-center">

                                <div ref={ref}
                                     className="flex-col justify-center w-max h-max bg-white py-12 px-24 mt-6 border-4 border-sky-500 rounded-xl ">
                                    <svg  onClick={() => {setShowModal(false)}} className=" flex justify-center h-10 w-10 text-black-500 cursor-pointer" width="24" height="24"
                                          viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                         strokeLinejoin="round">

                                        <path stroke="none" d="M0 0h24v24H0z"  />
                                        <line x1="18" y1="6" x2="6" y2="18"/>
                                        <line x1="6" y1="6" x2="18" y2="18"/>
                                    </svg>


                                    <Maps  stop_location={schedule.stop_location}/>
                                    <div className=" text-lg flex items-center justify-center py-5">
                                        <span className="text-lg">Делнично</span>
                                        <Switch
                                            checked={enabled}
                                            onChange={setEnabled}
                                            onClick={handleChange}
                                            className={`${
                                                enabled ? 'bg-blue-600' : 'bg-gray-200'
                                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                                        >
                                            <span className="sr-only">Enable notifications</span>
                                            <span
                                                className={`${
                                                    enabled ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block h-4 w-4 transform rounded-full bg-white`}
                                            />
                                        </Switch>
                                        <span className="text-lg">Празнично</span>
                                    </div>
                                    <div className="flex flex-row justify-center md:flex-col">
                                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full">
                                                        <thead className="border-b">
                                                        <tr>
                                                            <th scope="col"
                                                                className="text-lg font-medium text-black-500 px-6 py-4 ">
                                                                Тръгване от
                                                            </th>
                                                            <th scope="col"
                                                                className="text-lg font-medium text-black-500 px-6 py-4 ">
                                                                Час на тръгване
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {scheduleTime.map((s, index) => {
                                                            if (schedule.id === s.scheduleId) {
                                                                if (s.isHolliday === toggle) {

                                                                    return <tr key={index}>
                                                                        <td className="text-lg">
                                                                            {s.place}
                                                                        </td>
                                                                        <td id="scheduleTime" className="text-lg">
                                                                            {s.departure_time.join('\n')}
                                                                        </td>

                                                                    </tr>;
                                                                }
                                                            }
                                                        })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>


                </>
            ) : null}
        </>

    );


}

export default ScheduleCard;

