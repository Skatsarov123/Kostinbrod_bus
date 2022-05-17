
import React from "react";

import './Dashboard.css';
import ScheduleList from "../SheduleList";
import useInitialState from "../../hooks/useInitialState";



const Dashboard = () => {

    const [schedules, setSchedules] = useInitialState();


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