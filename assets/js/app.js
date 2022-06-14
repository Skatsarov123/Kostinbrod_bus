import React, {StrictMode} from "react";
import { Routes, Route, BrowserRouter as Router    } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import Register from './components/Register';
import Login from "./components/Login";
import  ErrorBoundary from './components/Common/ErrorBoundary';
import {AuthProvider} from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext'
import Create from './components/Create';
import Dashboard from "./components/Dashboard";
import MyProfile from "./components/MyProfile";
import Logout from "./components/Logout";
import GuardedRoute from './components/Common/GuardedRoute';
import ScheduleTime from "./components/ScheduleTime";
import Edit from "./components/Edit";
import StopCreate from "./components/Stops";
import AllStops from "./components/Stops/Stops";
import EditStop from "./components/Stops/Edit/EditStop";
import AllSchedules from "./components/Schedules/Schedules";
import EditSchedule from "./components/Schedules/Edit/EditSchedule";





function App() {

        return (

            <ErrorBoundary>
                <AuthProvider>
                    <NotificationProvider>
            <div id="container">
                <Header/>

                <main id="site-content">
                    <Routes>

                        <Route path="/" element={<Dashboard/>} />


                        <Route element={<GuardedRoute />}>
                            <Route path="/administration" element={<Create />} />
                            <Route path="/my-profile" element={<MyProfile/>} />
                            <Route path="/stop" element={<StopCreate/>} />
                            <Route path="/ScheduleTime/:scheduleId" element={<ScheduleTime />} />
                            <Route path="/edit/:scheduleTimeId" element={<Edit />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/stops" element={<AllStops />} />
                            <Route path="/schedules" element={<AllSchedules />} />
                            <Route path="/stops/editStop/:stopId" element={<EditStop />} />
                            <Route path="/schedule/editSchedule/:scheduleId" element={<EditSchedule />} />



                        </Route>

                        <Route path="/login" element={<Login />} />

                        <Route path="/logout" element={<Logout />} />


                    </Routes>
                </main>

                <footer id="site-footer">

                </footer>
            </div>
                    </NotificationProvider>
                </AuthProvider>
            </ErrorBoundary>


        )

}
    ReactDOM.render( <StrictMode><Router ><App/></Router> </StrictMode>, document.getElementById('root'));





