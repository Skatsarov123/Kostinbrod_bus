import {useAuthContext} from "../../../contexts/AuthContext";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DoneIcon from '@mui/icons-material/Done';
import Fab from "@mui/material/Fab";
import CloseIcon from '@mui/icons-material/Close';
import {grey} from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../../Common/ConfirmDialog";
import * as scheduleService from "../../../services/scheduleService";
import {DropdownButton} from "react-bootstrap";
import {Checkbox, FormControlLabel} from "@mui/material";



const EditSchedule = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { scheduleId } = useParams()
    const [schedule,setSchedule] = useState(scheduleId);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);


    useEffect (() => {
        scheduleService.getOne(scheduleId)
            .then(scheduleResult => {
                setSchedule(scheduleResult);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const deleteHandler = (e) => {
        scheduleService.destroy(scheduleId, user.token)
            .then( ()=> {
            })
            .finally(() => {
                setShowDeleteDialog(false);
                navigate('/schedules');
            });
    };
    const deleteClickHandler = () => {
        setShowDeleteDialog(true)
    };

    const scheduleEditSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let name = formData.get('name');


        scheduleService.update(scheduleId,user.token,{
            name,
        }, user.token)
            .then(result => {
                navigate('/schedules');
            })
    }


    return (
        <section id="create-page" className="edit">

            <form id="edit-form"  method="POST" onSubmit={scheduleEditSubmitHandler}>
                <fieldset className='edit'>
                    <h3>Редактирай Линия</h3>

                    <span className="field">
                        <label htmlFor="name">Име</label>
                        <div className="input">
                            <input type="text" name="name" id="name" defaultValue={schedule.name}/>
                        </div>
                    </span>
                    {/*<DropdownButton id="dropdown-basic-button" title="Спирки" >*/}
                    {/*    {busStops.map(element => (*/}
                    {/*        <FormControlLabel*/}
                    {/*            control={<Checkbox  name="stops" />}*/}
                    {/*            label={element.name}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</DropdownButton>*/}
                    <ConfirmDialog  show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={() => deleteHandler(scheduleId)} />

                    <div className="editButton">
                        <Fab size="small" className="btn-success" color="success" aria-label="add" type = "submit">
                            <DoneIcon />
                        </Fab>
                        <Link to="/schedules"  style={{ textDecoration: 'none' }}>
                            <Fab size="small" className="btn-danger"   aria-label="cancel"  >
                                <CloseIcon sx={{ color: grey }}/>
                            </Fab>
                        </Link>
                        <Fab size="small" className="deleteStop"  onClick={deleteClickHandler}>
                            <DeleteIcon />
                        </Fab>
                    </div>
                </fieldset>
            </form>

        </section>

    );
}

export default EditSchedule;