import React, {useState} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import useScheduleState from '../../hooks/useScheduleState';
import {useAuthContext} from "../../contexts/AuthContext";
import * as scheduleTimeService from "../../services/scheduleTimeService";





const Edit = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { scheduleTimeId } = useParams()
    const [open, setOpen] = useState(false);
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
    // handle click event of the ScheduleTime button
    const handleAddClick = () => {
        setStartTime([...startTime, {startTime }]);
    };

    const handleClose = () => setOpen(false);
    return (

        <section id="create-page" className="create">
            <form id="edit-form"  method="POST" onSubmit={scheduleEditSubmitHandler}>
                <fieldset className='edit'>
                    <h3>Редактирай разписание</h3>

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
                    <Link to="/administration"  style={{ textDecoration: 'none' }}>
                        <input className="button cancel"  value="Откажи"/>
                    </Link>
                </fieldset>
            </form>

        </section>

    );
}

export default Edit;