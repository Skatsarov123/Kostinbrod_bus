import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import * as stopService from '../../services/stopService';
import { useAuthContext } from '../../contexts/AuthContext';
import '../../../css/forms.css'
import  Dashboard  from '../Dashboard'
import {Button,Collapse} from "react-bootstrap";



const StopCreate = () => {

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

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
                navigate('/');
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
                    Добави спирка
                </Button>
                <Collapse in={open}>


                    <form id="create-form" onSubmit={onStopCreate} method="POST">
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
                            <input className="button submit" type="submit" value="Добави"/>
                        </fieldset>
                    </form>



                </Collapse>
            </>
        </section>
    );

}

export default StopCreate;
