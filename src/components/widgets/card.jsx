import React from 'react'

import { BiSolidUserCircle } from "react-icons/bi";

import useNavigationHelper from '../../helpers/routes';

const Card = ( { id, name } ) => {
    const { goPatient } = useNavigationHelper();

    return (
        <div className='card'onClick={() => goPatient(id)}>
            <h2><BiSolidUserCircle size={24} /> {name}</h2>
        </div>
    )
}

export default Card