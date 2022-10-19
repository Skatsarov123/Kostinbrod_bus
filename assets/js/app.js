import React, {StrictMode} from "react";
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Header';
import ReactDOM from 'react-dom';
import Login from "./components/Login";
import  ErrorBoundary from './components/Common/ErrorBoundary';
import {AuthProvider} from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext'
import Administration from './components/Administration';
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import GuardedRoute from './components/Common/GuardedRoute';
import ScheduleTime from "./components/ScheduleTime";
import Edit from "./components/ScheduleTime/Edit";
import StopCreate from "./components/Stops/Create/Create";
import AllStops from "./components/Stops/Stops";
import EditStop from "./components/Stops/Edit/EditStop";
import AllSchedules from "./components/Schedules/Schedules";
import EditSchedule from "./components/Schedules/Edit/EditSchedule";
import ScheduleCreate from "./components/Schedules/Create/ScheduleCreate";
import ScheduleTimePanel from "./components/ScheduleTimePanel/ScheduleTimePanel";
import ViewAllMessages from  "./components/Contact/MessagesAdminPanel/ViewAllMessages"
import MessageDetails  from "./components/Contact/MessageDetails/MessageDetails";
import GDPR from "./components/GDPR";





function App() {


        return (

            <ErrorBoundary>
                <AuthProvider>
                    <NotificationProvider>
            <div id="container">
                <Header/>

                <main id="site-content">

                    <Routes>
                            <Route element={<GuardedRoute />}>
                            <Route path="/administration" element={<Administration />} />
                            <Route path="/stop" element={<StopCreate/>} />
                            <Route path="/ScheduleTime/:scheduleId" element={<ScheduleTime />} />
                            <Route path="/edit/:scheduleTimeId" element={<Edit />} />
                            <Route path="/stops" element={<AllStops />} />
                            <Route path="/schedules" element={<AllSchedules />} />
                            <Route path="/stops/editStop/:stopId" element={<EditStop />} />
                            <Route path="/schedule/editSchedule/:scheduleId" element={<EditSchedule />} />
                            <Route path="/schedules/create" element={<ScheduleCreate />} />
                            <Route path="/stop/create" element={<StopCreate />} />
                            <Route path="/schedule-panel" element={<ScheduleTimePanel />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/view_all_messages" element={<ViewAllMessages />} />
                            <Route path="/message/:messageId" element={<MessageDetails />} />
                            </Route>


                        <Route path="/" element={<Dashboard/>} />
                        <Route path="/login" element={<Login />} />
                        {/*<Route path="/gdpr" element={<GDPR />} />*/}

                    </Routes>

                </main>
                <footer
                    id="site-footer">
                </footer>
            </div>
                    </NotificationProvider>
                </AuthProvider>
            </ErrorBoundary>


        )

}
    ReactDOM.render( <StrictMode><Router ><App/></Router> </StrictMode>, document.getElementById('root'));





