import React, {useEffect, useState} from "react";
import * as stopService from "../../services/stopService";
import {useAuthContext} from "../../contexts/AuthContext";

import {Link} from "react-router-dom";

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const AllStops = () => {


    const {user} = useAuthContext();
    const [stops, setStops] = useState([]);


    useEffect(() => {
        stopService.getAll()
            .then(result => {
                setStops(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5">Меню спирки
            </h3>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-black-500 dark:text-black-500">
                    <thead className="text-xs text-black-500 uppercase bg-gray-50 dark:text-black-500 dark:text-black-500">
                    <tr>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">
                            Име
                        </th>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">
                            Ширина
                        </th>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">
                            Дължина
                        </th>
                        <th scope="col"
                            className=" text-black-900 px-6 py-4 ">

                        </th>
                    </tr>
                    </thead>
                    <tbody >
                    {stops.map((x, i) => {
                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 " key={i}>

                            <td className="px-6">{x.name}</td>
                            <td className="px-6">{x.latitude}</td>
                            <td className="px-6">{x.longitude}</td>
                            <td className="px-6">
                                {user.username
                                    ? <Link to={`/stops/editstop/${x.id}`} style={{paddingRight: '5px'}}>
                                        <svg className=" h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                        </svg>
                                    </Link>
                                    : <></>
                                }
                            </td>
                        </tr>;
                    })}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center place-items-center gap-6 py-5 '>

                <Link to="/stop/create" >
                    <button  className="w-60 h-16 bg-red-500 text-white font-bold py-2 px-4 rounded">Добави спирка</button >
                </Link>
            </div>
        </>
    );

}
export default AllStops;