import React from 'react'

import { FaArrowLeftLong } from "react-icons/fa6";


const Stats = ( { onClose, id, text } ) => {
    return (
        <div className='pop-up'>
            <div className='pop-up-content'>
                <div className="right">
                    <div className="message reply">
                        <p>{text}</p>
                    </div>
                    <button onClick={onClose}><FaArrowLeftLong/> Voltar à consulta</button>
                </div>
            </div>
        </div>
    )
}

export default Stats