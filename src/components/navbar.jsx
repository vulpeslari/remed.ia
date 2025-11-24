import React, { useState, useEffect } from 'react';

import '../styles/navbar.css';

import { GiMedicines } from "react-icons/gi";
import { MdAddComment } from "react-icons/md";

import useNavigationHelper from '../helpers/routes.js';
import { getAppointments, getPatients } from '../helpers/connect.js';

const Navbar = () => {
    const { goRoot, goHome, goAppointment } = useNavigationHelper();
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);

    const access = localStorage.getItem("access");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentsData = await getAppointments();
                const patientsData = await getPatients();

                setAppointments(appointmentsData || []);
                setPatients(patientsData || []);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const handleClick = () => {
        goHome();
        window.location.reload();
    };

    const patientName = (id) => {
        const patient = patients.find(p => p.id_paciente === id);
        return patient ? patient.nome : 'Paciente desconhecido';
    };

    const pacientsIds = [...new Set(appointments.map(a => a.id_paciente))];

    return (
        <div className='navbar'>
            <header>
                <GiMedicines />
                <h1 onClick={goRoot}>Remed.IA</h1>
            </header>
            {access === 'doctor' && (
                <><div className='nav-menu'>
                    <ul>Consultas recentes</ul>
                    {appointments.length > 0 ? (
                        pacientsIds.map((id) => (
                            <li key={id} onClick={() => goAppointment(id)}>
                                {patientName(id)}
                            </li>
                        ))
                    ) : (
                        null
                    )}
                </div>
                    <button onClick={handleClick}>
                        <MdAddComment /> Nova consulta
                    </button>
                </>
            )}
        </div>
    );
};

export default Navbar;
