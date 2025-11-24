import React from 'react'

import { FaUserDoctor } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa6";

import useNavigationHelper from '../../helpers/routes'

const Category = ({ category, token }) => {
    const { goHome } = useNavigationHelper();

    const onClick = () => {
    localStorage.setItem("access", token);
    goHome();
}
    return (
        <div className='category-card' onClick={onClick}>
            {category === "Médico" ? <FaUserDoctor /> : <FaUserNurse />}
            <p>{category}</p>
        </div>
    )
}

export default Category