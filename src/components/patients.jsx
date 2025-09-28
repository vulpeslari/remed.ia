import React, { useEffect, useState } from 'react'

import useNavigationHelper from '../helpers/routes.js'
import { getPatients } from '../helpers/connect.js'

import { PiUsersThree } from "react-icons/pi";
import { FaArrowLeftLong } from "react-icons/fa6";

import Card from './widgets/card'

import '../styles/patients.css'

const Patients = () => {
    const { goBack } = useNavigationHelper();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        async function fetchPatients() {
            const data = await getPatients();
            setPatients(data);
        }
        fetchPatients();
    }, []
    )

    return (
        <div className='patients-content'>
            <div className='bg-img'></div>
            <h1><PiUsersThree /> Pacientes</h1>
            <div className='cards'>
                {patients.map((p) => (
                    <Card key={p.id_paciente} id={p.id_paciente} name={p.nome} />
                ))}
            </div>
            <button type="button" onClick={() => goBack()}>
                <FaArrowLeftLong /> Voltar
            </button>
        </div>
    )
}

export default Patients