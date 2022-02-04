import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as scheduleService from '../../services/scheduleService';
import useScheduleState from '../../hooks/useScheduleState';
import Dashboard from "../Dashboard";




const Edit = () => {
    const navigate = useNavigate();
    const { scheduleId } = useParams()
    const [schedule, setSchedule] = useScheduleState(scheduleId);


    console.log(schedule)
    console.log(schedule.name)
    const scheduleEditSubmitHandler = (e) => {
        e.preventDefault();

        let currentSchedule =Object.fromEntries(new FormData(e.currentTarget))

        scheduleService.update(scheduleId,currentSchedule)
            .then(result => {
                navigate('/');
            })
    }


    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...schedule];

        list[index][name] = value;
        setSchedule(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...schedule];
        list.splice(index, 1);
        setSchedule(list);
    };
    // handle click event of the Add button
    const handleAddClick = () => {
        setSchedule([...schedule, { departure_time: []}]);

    };

    return (
        <section id="edit-page" className="edit">

            <form id="create-form" onSubmit={scheduleEditSubmitHandler} method="POST">
                <fieldset className='create'>
                    <h3>Добави разписание</h3>
                    <span className="field">
                        <label htmlFor="name">Име</label>
                        <div className="input">
                                <input type="text" name="name" id="name" value={schedule.name}/>
                        </div>
                    </span>
                    <span className="field">
                        <label htmlFor="id">ID</label>
                        <div className="input">
                            <input type="text" name="id" id="id" defaultValue={schedule.id} />
                        </div>
                    </span>
                    {/*<span className="field">*/}
                    {/*    <label htmlFor="name">Час на тръгване</label>*/}
                    {/*    {schedule.map((x, i) => {*/}
                    {/*        return (*/}
                    {/*            <div className="">*/}
                    {/*                <div   className="input">*/}
                    {/*                     <input  type="time"  name="departure_time" id="departure_time" defaultValue={schedule.departure_time}*/}
                    {/*                            onChange={e => handleInputChange(e, i)}/>*/}
                    {/*                </div>*/}

                    {/*                {schedule.length !== 1 && <button*/}
                    {/*                    className="button submit"*/}
                    {/*                    onClick={() => handleRemoveClick(i)}>Премахни</button>}*/}
                    {/*                {inputList.length - 1 === i &&*/}
                    {/*                    <button className="button submit" type="time" name="departure_time" id="departure_time"*/}
                    {/*                            onClick={handleAddClick}>Добави</button>}*/}
                    {/*            </div>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*</span>*/}
                    <span className="field">
                        <label htmlFor="place">Място на тръгване</label>
                        <div className="input">
                            <input type="text" name="place" id="place"  value={schedule.id}   />
                        </div>
                    </span>
                    <input className="button submit" type="submit" value="Запази"/>
                </fieldset>
            </form>

        </section>

    );
}

export default Edit;