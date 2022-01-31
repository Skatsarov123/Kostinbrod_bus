import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as scheduleService from '../../services/scheduleService';
import useScheduleState from '../../hooks/useScheduleState';
import Dashboard from "../Dashboard";




const Edit = () => {
    const navigate = useNavigate();
    const { scheduleId } = useParams()
    const [schedule, setSchedule] = useScheduleState(scheduleId);


    console.log(schedule.name)
    const scheduleEditSubmitHandler = (e) => {
        e.preventDefault();

        let currentSchedule =Object.fromEntries(new FormData(e.currentTarget))
        console.log(currentSchedule)
        scheduleService.update(scheduleId,currentSchedule)
            .then(result => {
                navigate('/');
            })
    }

    // const [inputList, setInputList] = useState([schedule]);
    // // handle input change
    // const handleInputChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...inputList];
    //
    //     list[index][name] = value;
    //     setInputList(list);
    // };
    //
    // // handle click event of the Remove button
    // const handleRemoveClick = index => {
    //     const list = [...inputList];
    //     list.splice(index, 1);
    //     setInputList(list);
    // };
    // // handle click event of the Add button
    // const handleAddClick = () => {
    //     setInputList([...inputList, { departure_time: []}]);
    //
    // };

    return (
        <section id="edit-page" className="edit">
            <Dashboard />

            <form id="create-form" onSubmit={scheduleEditSubmitHandler} method="POST">
                <fieldset className='create'>
                    <h3>Добави разписание</h3>
                    <span className="field">
                        <label htmlFor="name">Име</label>
                        <div className="input">
                            <input type="text" name="name" id="name"  defaultValue={schedule.name} />
                        </div>
                    </span>
                    {/*<span className="field">*/}
                    {/*    <label htmlFor="name">Час на тръгване</label>*/}
                    {/*    {inputList.map((x, i) => {*/}
                    {/*        return (*/}
                    {/*            <div className="">*/}
                    {/*                <div   className="input">*/}
                    {/*                     <input  type="time"  name="departure_time" id="departure_time" defaultValue={schedule.departure_time}*/}
                    {/*                            onChange={e => handleInputChange(e, i)}/>*/}
                    {/*                </div>*/}

                    {/*                {inputList.length !== 1 && <button*/}
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
                        <label htmlFor="name">Място на тръгване</label>
                        <div className="input">
                            <input type="text" name="place" id="place"  defaultValue={schedule.place}   />
                        </div>
                    </span>
                    <input className="button submit" type="submit" value="Запази"/>
                </fieldset>
            </form>

        </section>

    );
}

export default Edit;