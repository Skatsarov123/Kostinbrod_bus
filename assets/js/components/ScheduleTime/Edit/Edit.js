import React, {useState} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import useScheduleState from '../../../hooks/useScheduleState';
import {useAuthContext} from "../../../contexts/AuthContext";
import * as scheduleTimeService from "../../../services/scheduleTimeService";
import ConfirmDialog from "../../Common/ConfirmDialog";






const Edit = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { scheduleTimeId } = useParams()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [schedule,startTime,setStartTime] = useScheduleState(scheduleTimeId);


    const scheduleEditSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);


        let departure_time = formData.getAll('departure_time');
        let place = formData.get('place');

        scheduleTimeService.update(scheduleTimeId,user.token,{
            departure_time,
            place,

        }, user.token)
            .then(result => {
                navigate('/schedule-panel');
            })
    }
    const deleteHandler = (e) => {

        scheduleTimeService.destroy(scheduleTimeId, user.token)
            .then( ()=> {

            })
            .finally(() => {
                setShowDeleteDialog(false);
                navigate('/schedule-panel');
            });

    };
    const deleteClickHandler = () => {
        setShowDeleteDialog(true)
    };

    // handle input change
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const list = [...startTime];
        list[index] = value;
        setStartTime(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...startTime];
        list.splice(index, 1);
        setStartTime(list);
    };
    // handle click event of the ScheduleTime button
    const handleAddClick = () => {
        setStartTime([...startTime, {startTime }]);
    };


    return (
        <section id="edit-page" >
            <>
                <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5" >Редактирай разписание</h3>
                <div className='flex justify-center place-items-center gap-6 py-5 '>
                    <form id="edit-form"  method="POST" onSubmit={scheduleEditSubmitHandler}>
                        <div>
                            <label className="flex justify-center content-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-96"  >Час на тръгване</label>
                            { startTime.map((x, i) => {
                                return (
                                    <div key={i} className="">
                                        <div  className="flex justify-center content-center mb-2 text-lg font-medium text-gray-900 dark:text-gray-300" >
                                            <input  type="time" name="departure_time" id="departure_time"
                                                    value={x}  onChange={e => handleInputChange(e, i)}/>
                                        </div>
                                        <div   className="flex justify-center content-center mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 gap-6">
                                        {startTime.length !== 1 && <button className="text-red-500" onClick={() => handleRemoveClick(i)}>Премахни</button>}
                                        {startTime.length - 1 === i &&
                                            <button className="text-green-500"
                                                    onClick={handleAddClick}>Добави</button>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <label className="flex justify-center content-center mb-2 text-lg font-medium text-gray-900 dark:text-gray-300" >Място на тръгване</label>
                            <input type="text" name="place" id="place"  defaultValue={schedule.place}
                                   className=" text-center bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <div className=" flex justify-center content-center">

                            <button type="submit">
                                <svg className="h-10 w-10 text-green-500" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </button>

                            <Link to="/schedule-panel">
                                <svg className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                            </Link>
                            <button type="button" onClick={deleteClickHandler}>
                                <svg className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    <line x1="10" y1="11" x2="10" y2="17"/>
                                    <line x1="14" y1="11" x2="14" y2="17"/>
                                </svg>
                            </button>
                        </div>

                    </form>
                </div>
            </>
            <ConfirmDialog  show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={() => deleteHandler(scheduleTimeId)} />
        </section>
    );
}

export default Edit;