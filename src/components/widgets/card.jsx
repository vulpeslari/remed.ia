import React from 'react'

import { BiSolidUserCircle } from "react-icons/bi";

import useNavigationHelper from '../../helpers/routes';

const Card = ( { id } ) => {
    const { goPatient } = useNavigationHelper();

    return (
        <div className='card'onClick={() => goPatient(id)}>
            <h2><BiSolidUserCircle size={24} /> Paciente</h2>
        </div>
    )
}

export default Card