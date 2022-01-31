import { Link} from 'react-router-dom';
import {Button,Collapse,Table} from "react-bootstrap";
import React,{ useState } from "react";



const ScheduleCard = ({
    schedule


}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                {schedule.name}
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Table className="schedule-table">
                        <thead>
                        <tr>
                            <th>Тръгване от</th>
                            <th>Час на тръгване</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                {schedule.place}</td>

                            <td  id="scheduleTime" className="scheduleTime">
                                {schedule.departure_time.join('\n')}
                            </td>

                        </tr>
                        </tbody>
                    </Table>
                    <Link className="button" to={`/edit/${schedule.id}`}>Редактирай</Link>


                </div>
            </Collapse>
        </>
    );
}

export default ScheduleCard;