import { useState, useEffect } from 'react';
import React from "react";
import * as ScheduleService from '../../services/scheduleService'
import './Dashboard.css';
import ScheduleList from "../SheduleList";
import useScheduleTimeState from "../../hooks/useScheduleTimeState";


const Dashboard = () => {

    const [schedules, setSchedules] = useState([]);
    useEffect(() => {
        ScheduleService.getAll()
            .then(result => {
                setSchedules(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <section id="dashboard-page" className="dashboard">

            <section>
                <ScheduleList schedules={schedules} />
            </section>
        </section>
        
    );
}

// export const PrivateDashboard = isAuth(Dashboard)

export default Dashboard;