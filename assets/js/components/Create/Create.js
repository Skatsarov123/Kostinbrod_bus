import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import * as scheduleService from '../../services/scheduleService';
import { useAuthContext } from '../../contexts/AuthContext';
import '../../../css/forms.css'
import  Dashboard  from '../Dashboard'
import {Button, Collapse, DropdownButton} from "react-bootstrap";
import StopCreate from "../Stops";
import {Checkbox, FormControlLabel} from "@mui/material";
import useStopState from "../../hooks/useStopsState";


const Create = () => {

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [busStops,setBusStops] = useStopState()

    console.log(busStops)
    const onScheduleCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let name = formData.get('name');
        let stops = formData.getAll('stops');
        scheduleService.create({
            name,
            stops

        }, user.token)
            .then(result => {
                navigate('/');
            })
    }

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
            <StopCreate/>
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
                    <DropdownButton id="dropdown-basic-button" title="Спирки" >
                        {busStops.map(element => (
                            <FormControlLabel
                                control={<Checkbox  name="stops" />}
                                label={element.name}
                            />
                        ))}
                    </DropdownButton>
                    <input className="button submit" type="submit" value="Добави"/>
                </fieldset>

            </form>


            </Collapse>
        </>
        </section>
    );

}

export default Create;
