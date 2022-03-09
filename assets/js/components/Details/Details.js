import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as petService from '../../services/scheduleService';
import * as likeService from '../../services/likeService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import useScheduleState from '../../hooks/useScheduleState';

import { Button } from 'react-bootstrap';
import ConfirmDialog from '../Common/ConfirmDialog';

const Details = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const { petId } = useParams();
    const [pet, setPet] = useScheduleState(petId);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // useEffect(() => {
    //     likeService.getPetLikes(petId)
    //         .then(likes => {
    //             setPet(state => ({...state, likes}))
    //         })
    // }, []);

    const deleteHandler = (e) => {
        e.preventDefault();

        petService.destroy(petId, user.accessToken)
            .then(() => {
                navigate('/dashboard');
            })
            .finally(() => {
                setShowDeleteDialog(false);
            });
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();
        console.log(process.env.NODE_ENV);
        setShowDeleteDialog(true);
    }

    const ownerButtons = (
        <>
            <Link className="button" to={`/edit/${pet._id}`}>Edit</Link>
            <a className="button" href="#" onClick={deleteClickHandler}>Delete</a>
        </>
    );



    return (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} />
            <section id="details-page" className="details">
                <div className="pet-information">
                    <h3>Name: {pet.name}</h3>
                    <p className="type">Type: {pet.type}</p>
                    <p className="img"><img src={pet.imageUrl} /></p>


                </div>
                <div className="pet-description">
                    <h3>Description:</h3>
                    <p>{pet.description}</p>
                </div>
            </section>
        </>
    );
}

export default Details;