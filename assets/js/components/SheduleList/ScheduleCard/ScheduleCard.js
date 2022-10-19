import React, {useRef, useState} from "react";
import useScheduleTimeState from '../../../hooks/useScheduleTimeState';
import {useAuthContext} from "../../../contexts/AuthContext";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import 'leaflet/dist/leaflet.css';
import {Switch} from "@headlessui/react";
import Maps from "../../Map/Maps";


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

    return (
        <>
            <button
                className='w-60 h-16  flex items-center justify-center    cursor-pointer rounded-md  bg-red-500 text-white'
                type="button"

                onClick={() => setShowModal(true)}>{schedule.name}</button>

            {showModal ? (
                <>
                    <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity ">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                            <div className="flex-col justify-center w-max h-max bg-white py-12 px-24 mt-6 border-4 border-sky-500 rounded-xl h-screen ">
                                <Maps   stop_location={schedule.stop_location}/>
                                <div className=" text-lg flex items-center justify-center py-5 ">
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
                                <table className="max-w-5xl border-2 border-red-500 ">
                                    <thead >
                                    <tr>
                                        <th scope="col"
                                            className="text-lg font-medium text-black-500 px-6 py-4 whitespace-nowrap border-2 border-red-500">
                                            Тръгване от
                                        </th>
                                        <th scope="col"
                                            className="text-lg font-medium text-black-500 px-6 py-4 whitespace-nowrap border-2 border-red-500">
                                            Час на тръгване
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {scheduleTime.map((s, index) => {
                                        if (schedule.id === s.scheduleId) {
                                            if (s.isHolliday === toggle) {

                                                return <tr key={index}>
                                                    <td className="text-lg border-2 border-red-500">
                                                        {s.place}
                                                    </td>
                                                    <td id="scheduleTime"  className="text-lg border-2 border-red-500 h-max  lg:h-20 lg:w-full md:h-44 md:w-64 h-64 md:w-full">
                                                        {s.departure_time.join('\n')}
                                                    </td>

                                                </tr>;
                                            }
                                        }
                                    })}
                                    </tbody>
                                </table>
                                <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                                    <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1" onClick={() => {setShowModal(false)}}>Назад
                                    </button>
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

