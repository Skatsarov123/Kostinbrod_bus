import {useState, useEffect, useMemo} from 'react';
import * as scheduleService from '../services/scheduleTimeService';

const useScheduleTimeState = () => {
    const [scheduleTime, setScheduleTime] =  useState([]);

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
        }, [])

    useEffect (() => {
        scheduleService.getAll()
            .then(scheduleTimeResult => {
                setScheduleTime(scheduleTimeResult);
            })
            .catch(err => {
                console.log(err);
            })
        return () => {
            controller.abort();
        }
    }, [controller]);


    return [
        scheduleTime,
        setScheduleTime
    ]
};

export default useScheduleTimeState;