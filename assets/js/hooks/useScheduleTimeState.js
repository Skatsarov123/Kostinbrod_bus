import { useState, useEffect } from 'react';
import * as scheduleService from '../services/scheduleTimeService';

const useScheduleTimeState = () => {
    const [scheduleTime, setScheduleTime] =  useState([]);
    useEffect (() => {

        scheduleService.getAll()
            .then(scheduleTimeResult => {
                setScheduleTime(scheduleTimeResult);
            })
    }, []);
    return [
        scheduleTime,
    ]
};

export default useScheduleTimeState;