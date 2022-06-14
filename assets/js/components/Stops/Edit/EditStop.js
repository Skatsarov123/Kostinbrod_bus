import {useAuthContext} from "../../../contexts/AuthContext";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as stopService from "../../../services/stopService";
import React, {useEffect, useState} from "react";
import DoneIcon from '@mui/icons-material/Done';
import Fab from "@mui/material/Fab";
import CloseIcon from '@mui/icons-material/Close';
import {grey} from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../../Common/ConfirmDialog";


const EditStop = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { stopId } = useParams()
    const [stops,setStops] = useState(stopId);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect (() => {
        stopService.getOne(stopId)
            .then(stopsResult => {
                setStops(stopsResult);

            })

            .catch(err => {
                console.log(err);
            })


    }, []);

    const deleteHandler = (e) => {

        stopService.destroy(stopId, user.token)
            .then( ()=> {

            })
            .finally(() => {
                setShowDeleteDialog(false);
                navigate('/stops');
            });

    };

    const deleteClickHandler = () => {
        setShowDeleteDialog(true)
    };
    const stopsEditSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let name = formData.get('name');
        let latitude = formData.get('latitude');
        let longitude = formData.get('longitude');

        stopService.update(stopId,user.token,{
           name,
            latitude,
            longitude,
        }, user.token)
            .then(result => {
                navigate('/stops');
            })
    }


    return (
        <section id="create-page" className="create">
            <form id="edit-form"  method="POST" onSubmit={stopsEditSubmitHandler}>
                <fieldset className='edit'>
                    <h3>Редактирай спирка</h3>


                    <span className="field">
                        <label htmlFor="name">Име</label>
                        <div className="input">
                            <input type="text" name="name" id="name" defaultValue={stops.name}/>
                        </div>
                    </span>
                    <span className="field">
                        <label htmlFor="name">Дължиня</label>
                        <div className="input">
                            <input type="text" name="latitude" id="latitude" defaultValue={stops.latitude}/>
                        </div>
                    </span>
                    <span className="field">
                        <label htmlFor="name">Ширина</label>
                        <div className="input">
                            <input type="text" name="longitude" id="longitude" defaultValue={stops.longitude}/>
                        </div>
                    </span>
                    <ConfirmDialog  show={showDeleteDialog} onClose={() => {setShowDeleteDialog(false);deleteHandler(stopId)}} onSave={() => deleteHandler(stopId)} />
                    <div className="editButton">
                    <Fab size="small" className="btn-success" color="success" aria-label="add" type = "submit">
                        <DoneIcon />
                    </Fab>
                    <Link to="/stops"  style={{ textDecoration: 'none' }}>
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

export default EditStop;