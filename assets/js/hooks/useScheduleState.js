import { useState, useEffect, useMemo } from 'react';
import * as scheduleService from '../services/scheduleService';

const useScheduleState = (scheduleId) => {
    const [schedule, setSchedule] =  useState({});



    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect(() => {

        scheduleService.getOne(scheduleId, controller.signal)
            .then(scheduleResult => {
                setSchedule(scheduleResult);

            })

        return () => {
            controller.abort();
        }
    }, [scheduleId, controller]);

    return [
        schedule,
        setSchedule,


    ]

};

export default useScheduleState;