import { useState, useEffect } from 'react';
import React from "react";
import * as marketService from '../../services/marketService'
import './Dashboard.css';
import MarketList from "../MarketList";

const Dashboard = () => {
    const [markets, setMarkets] = useState([]);

    useEffect(() => {
        marketService.getAll()
            .then(result => {

                setMarkets(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <section id="dashboard-page" className="dashboard">

            <section>
                <MarketList markets={markets} />
            </section>
        </section>
        
    );
}

// export const PrivateDashboard = isAuth(Dashboard)

export default Dashboard;