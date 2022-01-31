import ScheduleCard from "./ScheduleCard"
import React from "react";
const ScheduleList = ({
    schedules
}) => {
    return (
        <>

            {schedules.length > 0
                ? (
                    <ul className="other-markets-list" >

                        { schedules.map(x => <ScheduleCard key={x.id} schedule={x} />)}
                    </ul>
                ) 
                : <p className="no-schedule">No schedule in database!</p>
            }
        </>
    );
}

export default ScheduleList;