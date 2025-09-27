import React from 'react'

import useNavigationHelper from '../helpers/routes.js'

import { PiUsersThree } from "react-icons/pi";
import { FaArrowLeftLong } from "react-icons/fa6";

import Card from './widgets/card'

import '../styles/patients.css'

const Patients = () => {
    const { goBack } = useNavigationHelper();

    return (
        <div className='patients-content'>
            <div className='bg-img'></div>
            <h1><PiUsersThree /> Pacientes</h1>
            <div className='cards'>
                <Card id='teste'/>
            </div>
            <button type="button" onClick={() => goBack()}>
                <FaArrowLeftLong /> Voltar
            </button>
        </div>
    )
}

export default Patients