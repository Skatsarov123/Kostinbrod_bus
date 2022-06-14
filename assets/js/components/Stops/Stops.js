import React, {useEffect, useState} from "react";
import * as stopService from "../../services/stopService";
import {useAuthContext} from "../../contexts/AuthContext";
import {Table } from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import Create from "./Create/Create";
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

                <Table  striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Име</th>
                        <th>Ширина</th>
                        <th>Дължина</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stops.map((x, i) => {
                        return <tr key={i}>

                        <td>{x.name}</td>
                        <td>{x.latitude}</td>
                        <td>{x.longitude}</td>
                            <td>
                                {user.username
                                    ? <Link  to={`/stops/editstop/${x.id}`}  style={{ paddingRight: '5px' }}>
                                        <Fab size="small" color="secondary" aria-label="add">
                                            <EditIcon />
                                        </Fab>
                                </Link>
                                    : <></>
                                }
                            </td>
                    </tr>;
                    })}
                    </tbody>
                </Table>

            <Create  />
        </>
    );

}
export default AllStops;