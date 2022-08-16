import React, {useEffect, useMemo, useState} from "react";
import * as ScheduleService from "../services/scheduleService";


const useInitialState= () => {

    const [schedules, setSchedules] = useState([]);

    const controller = useMemo(() => {
        const controller = new AbortController();
        return controller;
    }, [])
    useEffect(() => {

        ScheduleService.getAll()
            .then(result => {
                setSchedules(result);
            })
            .catch(err => {
                console.log(err);
            })
        return () => {
            controller.abort();
        }
    }, [controller]);

    return [
        schedules,
        setSchedules,
    ]
}

export default useInitialState;