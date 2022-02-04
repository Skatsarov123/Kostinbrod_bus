import React from "react";
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
import Edit from "./components/Edit";

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
                        </Route>

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/edit/:scheduleId" element={<Edit />} />

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
    ReactDOM.render(<Router ><App/></Router> , document.getElementById('root'));





