// import {useState, useEffect, useMemo} from 'react';
// import * as scheduleService from "../services/scheduleService";
//
//
// const getOneSchedulesState = (scheduleId) => {
//
//     const [schedules, setSchedules] = useState([]);
//
//     const controller = useMemo(() => {
//         const controller = new AbortController();
//
//         return controller;
//     }, [])
//
//     useEffect (() => {
//
//         scheduleService.getOne(scheduleId, controller.signal)
//             .then(scheduleResult => {
//                 setSchedules(scheduleResult);
//
//
//             })
//
//         return () => {
//             controller.abort();
//         }
//     }, [scheduleId, controller]);
//
//
//     return [
//         schedules,
//         setSchedules
//     ]
// };
//
// export default getOneSchedulesState;