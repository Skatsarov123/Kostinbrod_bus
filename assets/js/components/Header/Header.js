import { Nav } from "react-bootstrap";
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import {useAuthContext} from '../../contexts/AuthContext';
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";



const Header = () => {

    const {user} = useAuthContext();

        const [navBar, setNavBar] = useState(false);

        const handleNav = () => {
            setNavBar(!navBar);
        };

    let guestNavigation = (
        <Nav className='flex flex-col md:flex-row' >
            {/*<Nav.Link as={Link}  className={'p-4'} to="/schedule">Разписания</Nav.Link>*/}
            {/*<Nav.Link as={Link}  className={'p-4'} to="/news">Новини</Nav.Link>*/}
            {/*<Nav.Link as={Link}  className={'p-4'} to="/contacts">Контакти</Nav.Link>*/}

        </Nav>
    );
    let userNavigation = (
        <Nav className='flex flex-col md:flex-row' >
            <Nav.Link as={Link}  className={'p-4'} to="/administration">Администрация</Nav.Link>
            {/*<Nav.Link as={Link}  className={'p-4'} to="/schedule">Разписания</Nav.Link>*/}
            {/*<Nav.Link as={Link}  className={'p-4'} to="/news">Новини</Nav.Link>*/}
            {/*<Nav.Link as={Link}  className={'p-4'} to="/contacts">Контакти</Nav.Link>*/}
            <Nav.Link as={Link}  className={'p-4'} to="/logout">Logout</Nav.Link>

        </Nav>
    );

    return (

        <div className='flex justify-between items-center h-12  mx-auto px-4  bg-white text-black font-bold' >
            <Nav.Link as={Link} to="/">
                <h1 className='w-full text-xl font-bold text-gray-700'>KOSTINBROD BUS</h1></Nav.Link>
            <ul className='hidden md:flex'>
                <Nav   >
                    {user.username
                        ? userNavigation
                        : guestNavigation
                    }
                </Nav>
            </ul>
            <div onClick={handleNav} className='block md:hidden text-black font-bold'>
                {navBar ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
            </div >
            <ul className={navBar ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-white-500 bg-white ease-in-out duration-500  '  : 'ease-in-out duration-500 fixed left-[-100%]'}>
                <Nav  className='p-4'>
                    {user.username
                        ? userNavigation
                        : guestNavigation
                    }
                </Nav>
            </ul>
        </div>

    );

}

export default Header;