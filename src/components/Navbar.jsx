import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex justify-between p-4 bg-gray-800 text-white">
            <ul className="flex">
                <li className="mx-2">
                    <Link to="/pagina1" className="text-white no-underline">Student Form</Link>
                </li>
                <li className="mx-2">
                    <Link to="/pagina2" className="text-white no-underline">Teacher Panel</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;