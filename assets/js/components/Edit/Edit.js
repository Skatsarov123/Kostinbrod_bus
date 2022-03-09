import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as scheduleService from '../../services/scheduleService';
import useScheduleState from '../../hooks/useScheduleState';
import {useAuthContext} from "../../contexts/AuthContext";



const Edit = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { scheduleId } = useParams()
    const [schedule,startTime,setStartTime] = useScheduleState(scheduleId);



    const scheduleEditSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let name = formData.get('name');
        let startPoint = formData.get('startPoint');
        let endPoint = formData.get('endPoint');
        let departure_time = formData.getAll('departure_time');
        let place = formData.get('place');

        scheduleService.create({
            name,
            startPoint,
            endPoint,
            departure_time,
            place,

        }, user.token)
            .then(result => {
                navigate('/');
            })
    }


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
    // handle click event of the Add button
    const handleAddClick = () => {
        setStartTime([...startTime, {startTime }]);
    };
    return (
        <section id="create-page" className="create">
            <form id="edit-form"  method="POST" onSubmit={scheduleEditSubmitHandler}>
                <fieldset className='edit'>
                    <h3>Редактирай разписание</h3>
                    <span className="field">
                        <label htmlFor="name">Име</label>
                        <div className="input">
                            <input  type="name" name="name" id="name" defaultValue={schedule.name}/>
                        </div>
                    </span>
                    <span className="field">
                        <label htmlFor="name">Име</label>
                        <div className="input">
                            <input  type="text" name="startPoint" id="startPoint" defaultValue={schedule.startPoint}/>
                        </div>
                    </span>
                    <span className="field">
                        <label htmlFor="name">Име</label>
                        <div className="input">
                            <input  type="text" name="endPoint" id="endPoint" defaultValue={schedule.endPoint}/>
                        </div>
                    </span>
                    <span className="field">
                        <label htmlFor="name">Час на тръгване</label>
                        { startTime.map((x, i) => {
                            return (
                                <div key={i} className="">
                                    <div   className="input">
                                        <input  type="time" name="departure_time" id="departure_time"
                                                value={x}  onChange={e => handleInputChange(e, i)}/>
                                    </div>
                                    {startTime.length !== 1 && <button
                                        className="button submit"
                                        onClick={() => handleRemoveClick(i)}>Премахни</button>}
                                    {startTime.length - 1 === i &&
                                        <button className="button submit"
                                                onClick={handleAddClick}>Добави</button>}
                                </div>
                            );
                        })}
                    </span>
                    <span className="field">
                        <label htmlFor="place">Място на тръгване</label>
                        <div className="input">
                            <input type="place" name="place" id="place" defaultValue={schedule.place}/>
                        </div>
                    </span>
                    <input className="button submit" type="submit" value="Запази"/>
                </fieldset>
            </form>

        </section>

    );
}

export default Edit;