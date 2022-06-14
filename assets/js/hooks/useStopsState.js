import {useState, useEffect, useMemo} from 'react';
import * as stopService from '../services/stopService';

const useStopsState = (scheduleStopsIds) => {

    const [scheduleStops, setScheduleStops] =  useState([]);

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect (() => {
        stopService.getBy(scheduleStopsIds)
            .then(scheduleStopsResult => {
                setScheduleStops(scheduleStopsResult);
              
            })

            .catch(err => {
                console.log(err);
            })

        return () => {
            controller.abort();
        }
    }, [scheduleStopsIds,controller]);



    return [
        scheduleStops,
        setScheduleStops
    ]
};

export default useStopsState;