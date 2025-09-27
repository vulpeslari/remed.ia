import React from 'react'

import { FaArrowLeftLong } from "react-icons/fa6";

import PatientForm from '../patientForm'

const Records = ( { onClose} ) => {
    return (
        <div className='pop-up'>
            <div className='pop-up-content'>
                <div className="patient-info">
                    <PatientForm typeForm='read'/>
                </div>
                <div className="right">
                    <div className="message reply">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam volutpat eros et feugiat bibendum. Donec sit amet efficitur nibh, vitae facilisis tortor. In sed maximus massa. Vestibulum vitae magna sagittis, luctus erat quis, varius odio. Phasellus commodo dictum neque, quis varius urna dapibus eget. Morbi auctor hendrerit vehicula. Donec id.
                        </p>
                    </div>
                    <button onClick={onClose}><FaArrowLeftLong/> Voltar à consulta</button>
                </div>
            </div>
        </div>
    )
}

export default Records