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
        <section id="edit-page" >
            <>
                <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5" >Добави спирка</h3>
                <div className='flex justify-center place-items-center gap-6 py-5 '>
                    <form id="edit-form"  method="POST" onSubmit={stopsEditSubmitHandler}>
                        <div>
                            <label className="flex justify-center content-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-96"  >Име</label>
                            <input type="text" name="name" id="name" defaultValue={stops.name}
                                   className=" text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 />
                        </div>
                        <div>
                            <label className="flex justify-center content-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Ширина</label>
                            <input type="text" name="latitude" id="latitude" defaultValue={stops.latitude}
                                   className=" text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 />
                        </div>
                        <div>
                            <label className="flex justify-center content-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"  >Дължина</label>
                            <input type="text" name="longitude" id="longitude" defaultValue={stops.longitude}
                                   className=" text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                        </div>
                        <div className=" flex justify-center content-center">
                            <button type="submit">
                                <svg className="h-10 w-10 text-green-500" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </button>
                            <Link to="/stops">
                                <svg className=" h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                            </Link>

                            <button type="button" onClick={deleteClickHandler}>
                            <svg className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path
                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                            </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </>
            <ConfirmDialog  show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={() => deleteHandler(stopId)} />

        </section>


    );
}

export default EditStop;