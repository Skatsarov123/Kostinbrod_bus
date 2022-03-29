import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import * as scheduleService from '../../services/scheduleService';
import { useAuthContext } from '../../contexts/AuthContext';
import '../../../css/forms.css'
import  Dashboard  from '../Dashboard'
import {Button,Collapse} from "react-bootstrap";



const Create = () => {

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const onScheduleCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let name = formData.get('name');

        scheduleService.create({
            name,


        }, user.token)
            .then(result => {
                navigate('/');
            })
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
        <Dashboard/>
        <>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Добави линия
            </Button>
            <Collapse in={open}>



            <form id="create-form" onSubmit={onScheduleCreate} method="POST">
                <fieldset className='create'>
                    <h3>Добави разписание</h3>
                    <span className="field">
                        <label htmlFor="name">Име</label>
                        <div className="input">
                            <input type="text" name="name" id="name" placeholder="Sofia-Kostinbrod"/>
                        </div>
                    </span>
                    {/*<span className="field">*/}
                    {/*    <label htmlFor="startPoint">Начало</label>*/}
                    {/*    <div className="input">*/}
                    {/*        <input type="text" name="startPoint" id="startPoint" placeholder="Sofia"/>*/}
                    {/*    </div>*/}
                    {/*</span>*/}
                    {/*<span className="field">*/}
                    {/*    <label htmlFor="endPoint">Край</label>*/}
                    {/*    <div className="input">*/}
                    {/*        <input type="text" name="endPoint" id="endPoint" placeholder="Kostinbrod"/>*/}
                    {/*    </div>*/}
                    {/*</span>*/}
                    {/*<span className="field">*/}
                    {/*    <label htmlFor="name">Час на тръгване</label>*/}
                    {/*    {inputList.map((x, i) => {*/}
                    {/*        return (*/}
                    {/*            <div className="">*/}
                    {/*                <div className="input">*/}
                    {/*                    <input*/}
                    {/*                        type="time" name="departure_time" id="departure_time" placeholder="8:45"*/}
                    {/*                           value={x.departure_time} onChange={e => handleInputChange(e, i)}/>*/}
                    {/*              </div>*/}
                    {/*                {inputList.length !== 1 && <button*/}
                    {/*                    className="button submit"*/}
                    {/*                    onClick={() => handleRemoveClick(i)}>Премахни</button>}*/}
                    {/*                {inputList.length - 1 === i &&*/}
                    {/*                    <button className="button submit" type="text" name="departure_time" id="departure_time"*/}
                    {/*                            onClick={handleAddClick}>Добави</button>}*/}
                    {/*            </div>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*</span>*/}
                    {/*<span className="field">*/}
                    {/*    <label htmlFor="name">Място на тръгване</label>*/}
                    {/*    <div className="input">*/}
                    {/*        <input type="place" name="place" id="place" placeholder="Sofia"/>*/}
                    {/*    </div>*/}
                    {/*</span>*/}
                    <input className="button submit" type="submit" value="Добави"/>
                </fieldset>
            </form>


            </Collapse>
        </>
        </section>
    );

}

export default Create;
