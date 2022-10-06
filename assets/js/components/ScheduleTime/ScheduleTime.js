import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import * as scheduleTimeService from '../../services/scheduleTimeService';
import { useAuthContext } from '../../contexts/AuthContext';
import * as scheduleService from "../../services/scheduleService";



const ScheduleTime = () => {
    const { scheduleId } = useParams()
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [scheduleName ,setScheduleName] = useState()



    useEffect (() => {
        scheduleService.getOne(scheduleId)
            .then(scheduleResult => {
                setScheduleName(scheduleResult.name)

            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const onScheduleCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let departure_time = formData.getAll('departure_time');
        let place = formData.get('place');
        let isHoliday =isChecked



        scheduleTimeService.create({
            departure_time,
            place,
            scheduleId,
            isHoliday,
            scheduleName
        }, user.token)
            .then(result => {
                navigate('/schedules');
            })
    }


    const handleOnChange = (e)=>{
        setIsChecked(e.target.checked)
    }
    const [inputList, setInputList] = useState([{  departure_time: []}]);
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    // handle click event of the ScheduleTime button
    const handleAddClick = () => {
        setInputList([...inputList, { departure_time: ""}]);
    };
    return (
        <section id="edit-page" >
            <>
                <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5" >Добави разписание</h3>
                <div className='flex justify-center place-items-center gap-6 py-5 '>
                    <form id="edit-form"  method="POST" onSubmit={onScheduleCreate}>
                        <div>
                            <label className="flex justify-center content-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-96"  >Час на тръгване</label>

                            {inputList.map((x, i) => {
                                return (
                                    <div className="" key={i}>

                                        <div  className="flex justify-center content-center mb-2 text-lg font-medium text-gray-900 dark:text-gray-300" >
                                            <input
                                                type="text" name="departure_time" id="departure_time" placeholder="8:45"
                                                value={x.departure_time} onChange={e => handleInputChange(e, i)}/>
                                        </div>
                                        <div  className="flex justify-center content-center mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 gap-6" >
                                        {inputList.length !== 1 && <button  className="text-red-500" onClick={() => handleRemoveClick(i)}>Премахни</button>}
                                        {inputList.length - 1 === i &&
                                            <button className="text-green-500"  name="departure_time" id="departure_time"
                                                    onClick={handleAddClick}>Добави</button>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <label className="flex justify-center content-center mb-2 text-lg font-medium text-gray-900 dark:text-gray-300" >Място на тръгване</label>
                            <input type="text"  name="place" id="place" placeholder="Sofia"
                                   className=" text-center bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-center my-3">
                        <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer " type="checkbox" value="" id="flexCheckDefault"  checked={isChecked} onChange={handleOnChange}/>
                            <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                               Празнично
                            </label>
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
        </section>
    );

}

export default ScheduleTime;
