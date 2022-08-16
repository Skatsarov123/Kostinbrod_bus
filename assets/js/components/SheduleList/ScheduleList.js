import ScheduleCard from "./ScheduleCard"
import React from "react";
import ScheduleTimePanel from "../ScheduleTimePanel/ScheduleTimePanel";

const ScheduleList = ({
    schedules
}) =>
{

    return (
        <>


            {schedules.length > 0

                ? (

                    <div className='flex flex-col justify-center place-items-center gap-6 md:flex md:flex-row  '>

                        { schedules.map(x => <ScheduleCard  key={x.id} schedule={x} />)}


                    </div>

                )
                : <div className="flex justify-center items-center space-x-2">
                    <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-red-500"
                         role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>

                </div>
            }
        </>
    );
}

export default ScheduleList;