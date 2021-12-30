import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import React from "react";
import {useAuthContext} from '../../contexts/AuthContext';

const Header = () => {
    const {user} = useAuthContext();


    let guestNavigation = (
        <Nav className="right--1">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>


        </Nav>
    );
    let userNavigation = (
        <Nav className="right--1">

            <Nav.Link as={Link} to="/my-profile">My Profile</Nav.Link>
            <Nav.Link as={Link} to="/create">Add Load</Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
        </Nav>
    );

    return (
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/dashboard">Navbar</Navbar.Brand>
                    <Nav className="right--1">

                        {user.username
                            ? userNavigation
                            : guestNavigation
                        }

                    </Nav>
                </Container>
            </Navbar>
    );
}

export default Header;