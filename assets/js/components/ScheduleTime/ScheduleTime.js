import React, {useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import * as scheduleTimeService from '../../services/scheduleTimeService';
import { useAuthContext } from '../../contexts/AuthContext';
import '../../../css/forms.css'


const ScheduleTime = () => {
    const { scheduleId } = useParams()
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

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

        }, user.token)
            .then(result => {
                navigate('/');
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
        <section id="create-page" className="create">
                    <form id="create-form" onSubmit={onScheduleCreate} method="POST">
                        <fieldset className='add'>
                            <h3>Добави разписание</h3>
                            <span className="field">
                                <label htmlFor="name">Час на тръгване</label>
                                {inputList.map((x, i) => {
                                    return (
                                        <div className="" key={i}>
                                            <div className="input">
                                                <input
                                                    type="time" name="departure_time" id="departure_time" placeholder="8:45"
                                                       value={x.departure_time} onChange={e => handleInputChange(e, i)}/>
                                          </div>
                                            {inputList.length !== 1 && <button
                                                className="button submit"
                                                onClick={() => handleRemoveClick(i)}>Премахни</button>}
                                            {inputList.length - 1 === i &&
                                                <button className="button submit" type="text" name="departure_time" id="departure_time"
                                                        onClick={handleAddClick}>Добави</button>}
                                        </div>
                                    );
                                })}
                            </span>
                            <span className="field">
                                <label htmlFor="name">Място на тръгване</label>
                                <div className="input">
                                    <input type="place" name="place" id="place" placeholder="Sofia"/>
                                </div>
                            </span>
                            <span>
                                <label>
                                    <input type="checkbox"  checked={isChecked} onChange={handleOnChange}/>
                                    <span>Празнично</span>
                                 </label>
                            </span>
                            <input className="button submit" type="submit" value="Добави"/>
                        </fieldset>
                    </form>
        </section>
    );

}

export default ScheduleTime;
