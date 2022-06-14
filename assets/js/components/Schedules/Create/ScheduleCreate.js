import {useAuthContext} from "../../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import useStopState from "../../../hooks/useStopsState";
import * as scheduleService from "../../../services/scheduleService";

import {Collapse, DropdownButton,Button} from "react-bootstrap";
import { Checkbox, FormControlLabel} from "@mui/material";
import Fab from "@mui/material/Fab";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {grey} from "@mui/material/colors";

const ScheduleCreate = () => {

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
                navigate('/schedules');
            })
    }

    return (
        <section id="create-page" className="create">
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
                        <DropdownButton id="dropdown-basic-button" title="Спирки" >
                            {busStops.map(element => (
                                <FormControlLabel
                                    control={<Checkbox  name="stops" />}
                                    label={element.name}
                                />
                            ))}
                        </DropdownButton>
                        <div className="editButton">
                            <Fab size="small" className="btn-success"onClick={() => setOpen(!open)} color="success" aria-label="add" type = "submit">
                                <DoneIcon />
                            </Fab>

                            <Fab size="small" className="btn-danger" onClick={() => {setOpen(!open);{  formRef.current.reset();}}}  aria-label="cancel"  >
                                <CloseIcon sx={{ color: grey }}/>
                            </Fab>
                        </div>
                    </fieldset>

                </form>


            </Collapse>
        </>
</section>
);

}

export default ScheduleCreate;