import { useState, useEffect, useMemo } from 'react';
import * as scheduleService from '../services/scheduleService';

const useScheduleState = (scheduleId) => {
    const [schedule, setSchedule] =  useState({});
    const [startTime, setStartTime] = useState([]);


    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect (() => {

        scheduleService.getOne(scheduleId, controller.signal)
            .then(scheduleResult => {
                setSchedule(scheduleResult);
                setStartTime(scheduleResult.departure_time)

            })

        return () => {
            controller.abort();
        }
    }, [scheduleId, controller]);

    return [
        schedule,
        startTime,
        setStartTime
    ]

};

export default useScheduleState;