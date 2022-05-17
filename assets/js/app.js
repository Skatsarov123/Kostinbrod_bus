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
                            <Route path="/create" element={<Create />} />
                            <Route path="/my-profile" element={<MyProfile/>} />
                            <Route path="/stop" element={<StopCreate/>} />
                        </Route>

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/ScheduleTime/:scheduleId" element={<ScheduleTime />} />
                        <Route path="/edit/:scheduleTimeId" element={<Edit />} />

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





