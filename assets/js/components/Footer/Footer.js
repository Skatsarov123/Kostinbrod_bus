import React from "react";
import {Link} from 'react-router-dom';
const Footer = () => {

    return (
        <>
            <footer
                className="p-4 bg-gradient-to-r from-red-500 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
    <span className="text-sm text-white-500 sm:text-center dark:text-gray-400">© 2022 Created by&nbsp;<a href="https://bg.linkedin.com/in/stanimir-katsarov-bb527391"
                                                                                        className="hover:underline">Stanimir Katsarov</a>. All Rights Reserved.
    </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-white-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link to="/gdpr">
                        <a  className="mr-4 hover:underline md:mr-6 ">Защита на личните данни</a>
                        </Link>
                    </li>

                </ul>
            </footer>

        </>
    );
}

export default Footer;