import { Link} from 'react-router-dom';
import {Button,Collapse,Table} from "react-bootstrap";
import React, {useState} from "react";
import useScheduleTimeState from '../../../hooks/useScheduleTimeState';

const ScheduleCard = ({
    schedule

}) => {
    const [open, setOpen] = useState(false);
    const [scheduleTime, setScheduleTime] = useScheduleTimeState([])



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

                       {scheduleTime.map((s,index) => {

                           if (schedule.id === s.scheduleId) {
                               return <tr key={index}>
                                   <td>
                                       {s.place}
                                   </td>
                                   <td id="scheduleTime" className="scheduleTime">
                                       {s.departure_time.join('\n')}
                                   </td>
                                   <td>
                                       <Link className="button" to={`/edit/${s.id}`}>Редактирай</Link>
                                   </td>
                               </tr>;
                           }


                       })}

                        </tbody>
                    </Table>
                    <Link className="button" to={`/scheduleTime/${schedule.id}`}>Добави Разписание</Link>



                </div>
            </Collapse>
        </>

    );

}

export default ScheduleCard;