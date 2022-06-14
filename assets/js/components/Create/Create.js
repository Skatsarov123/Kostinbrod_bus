import React, {useState} from "react";
import { useNavigate,Link } from 'react-router-dom';
import * as scheduleService from '../../services/scheduleService';
import { useAuthContext } from '../../contexts/AuthContext';
import '../../../css/forms.css'
import  Dashboard  from '../Dashboard'
import { Collapse, DropdownButton} from "react-bootstrap";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import useStopState from "../../hooks/useStopsState";



const Create = () => {

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [busStops,setBusStops] = useStopState()


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

            <Link to="/stops"  style={{ textDecoration: 'none' }}>
                <Button>Спирки</Button>
            </Link>
            <Link to="/schedules"  style={{ textDecoration: 'none' }}>
                <Button>Линии</Button>
            </Link>
        <>
            <Dashboard/>

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
