import {useAuthContext} from "../../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as scheduleService from "../../../services/scheduleService";
import {Checkbox, FormControlLabel} from "@mui/material";
import * as stopService from "../../../services/stopService";

const ScheduleCreate = () => {

    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [busStops, setBusStops] = useState([])
    const [names,setNames] = useState([])





    useEffect(() => {
        stopService.getAll()
            .then(result => {
                setBusStops(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);



    console.log(names)
    const onScheduleCreate = (e) => {

        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let name = formData.get('name');
        let stops = formData.getAll('stops');
        let test = formData.values()
        console.log(test)
        scheduleService.create({
            name,
            stops,
        }, user.token)
            .then(result => {
                navigate('/schedules');
            })
    }

    return (
        <>
            <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5">Добави
                линия</h3>
            <div className='flex justify-center place-items-center gap-6 py-5 '>

                <form onSubmit={onScheduleCreate} method="POST">
                    <div>
                        <label
                            className="flex justify-center content-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Име</label>
                        <input type="text" name="name" id="name"
                               className=" text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Kostinbrod - Sofia"/>
                    </div>
                    <label className=" flex justify-center content-center" htmlFor="name">Спирки</label>
                    <div id="dropdown-basic-button" title="Спирки">
                        {busStops.map(element => (
                            <FormControlLabel
                                key={element.id}
                                control={<Checkbox name="stops"/>}
                                label={element.name}
                                value={element.id}
                                onClick={()=>setNames(element.name)}
                            />

                        ))}
                    </div>
                    <div className=" flex justify-center content-center">
                        <button type="submit">
                            <svg className="h-10 w-10 text-green-500" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </button>
                        <Link to="/schedules">
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
    );

}

export default ScheduleCreate;