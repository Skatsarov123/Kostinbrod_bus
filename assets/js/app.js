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

function App() {

        return (
            <React.StrictMode>

            <ErrorBoundary>
                <AuthProvider>
                    <NotificationProvider>
            <div id="container">
                <Header/>

                <main id="site-content">
                    <Routes>

                        <Route path="/dashboard" element={<Dashboard/>} />
                        <Route path="/my-profile" element={<MyProfile/>} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />

                    </Routes>
                </main>

                <footer id="site-footer">

                </footer>
            </div>
                    </NotificationProvider>
                </AuthProvider>
            </ErrorBoundary>

            </React.StrictMode>
        )

}
    ReactDOM.render(<Router ><App/></Router>, document.getElementById('root'));





