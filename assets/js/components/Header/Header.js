import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import React from "react";
import {useAuthContext} from '../../contexts/AuthContext';

const Header = () => {
    const {user} = useAuthContext();


    let guestNavigation = (
        <Nav >
            <Nav.Link as={Link} to="/Schedule">Разписания</Nav.Link>
            <Nav.Link as={Link} to="/news">Новини</Nav.Link>
            <Nav.Link as={Link} to="/contacts">Контакти</Nav.Link>


        </Nav>
    );
    let userNavigation = (
        <Nav>
            <Nav.Link as={Link} to="/administration">Администрация</Nav.Link>
            <Nav.Link as={Link} to="/schedule">Разписания</Nav.Link>
            <Nav.Link as={Link} to="/news">Новини</Nav.Link>
            <Nav.Link as={Link} to="/contacts">Контакти</Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>

        </Nav>
    );

    return (
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Автобусни Превози Костинброд</Navbar.Brand>
                    <Nav>
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