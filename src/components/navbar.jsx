import React from 'react'

import '../styles/navbar.css'

import { GiMedicines } from "react-icons/gi";
import { MdAddComment } from "react-icons/md";

import useNavigationHelper from '../helpers/routes.js';

const Navbar = () => {
    const { goRoot, goHome } = useNavigationHelper();

    let access = localStorage.getItem("access") == "doctor" ? "Consulta" : "Conversa";

    return (
        <div className='navbar'>
            <header>
                <GiMedicines />
                <h1 onClick={() => goRoot()}>Remed.IA</h1>
            </header>
            <div className='nav-menu'>
                <ul>{access}s recentes</ul>
                <li>{access} 1</li>
                <li>{access} 2</li>
            </div>
            <button onClick={() => goHome()}> <MdAddComment/> Nova {access}</button>
        </div>
    )
}

export default Navbar