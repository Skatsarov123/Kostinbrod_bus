import React, {useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import * as stopService from '../../../services/stopService';
import { useAuthContext } from '../../../contexts/AuthContext';
import '../../../../css/forms.css'
import {Button,Collapse} from "react-bootstrap";
import DoneIcon from "@mui/icons-material/Done";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import {grey} from "@mui/material/colors";

const StopCreate = () => {

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const formRef = useRef();

    const onStopCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let name = formData.get('name');
        let latitude = formData.get('latitude');
        let longitude = formData.get('longitude');


        stopService.create({
            name,
            latitude,
            longitude

        }, user.token)
            .then(result => {
                navigate('/stops');
            })
    }

    return (

        <section id="create-page" className="create">
            <>
                <Button
                    onClick={() => {setOpen(!open);{  formRef.current.reset();}}}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}

                >
                    Добави спирка
                </Button>
                <Collapse in={open}>


                    <form  ref={formRef} id="create-form" onSubmit={onStopCreate} method="POST">
                        <fieldset className='create'>
                            <h3>Добави разписание</h3>
                            <span className="field">
                        <label htmlFor="name">Име</label>
                        <div className="input">
                            <input type="text" name="name" id="name" placeholder="Ломско шосе"/>
                        </div>
                                    </span>
                            <span className="field">
                        <label htmlFor="name">Ширина</label>
                        <div className="input">
                            <input type="text" name="latitude" id="latitude" placeholder="42.741173797992744"/>
                        </div>
                                    </span>
                            <span className="field">
                        <label htmlFor="name">Дължина</label>
                        <div className="input">
                            <input type="text" name="longitude" id="longitude" placeholder="23.28697396123882"/>
                        </div>
                    </span>
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

export default StopCreate;
