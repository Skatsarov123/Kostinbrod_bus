import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import {Table } from "react-bootstrap";
import {Link} from "react-router-dom";
import * as scheduleService from "../../services/scheduleService";
import Create from "../Schedules/Create/ScheduleCreate";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";



const AllSchedules = () => {

    const {user} = useAuthContext();
    const [schedules, setSchedules] = useState([]);



    useEffect(() => {
        scheduleService.getAll()
            .then(result => {
                setSchedules(result);
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
                {schedules.map((x, i) => {
                    return <tr key={i}>
                        <td>{x.name}</td>
                        <td>{x.stop_location}</td>



                        <td>
                            {user.username
                                ? <Link  to={`/schedule/editSchedule/${x.id}`}  style={{ paddingRight: '5px' }}>
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

            <Create />
        </>
    );

}
export default AllSchedules;