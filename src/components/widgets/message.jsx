import React, { useState } from 'react'

import { IoDocumentText } from "react-icons/io5"

import Records from '../widgets/records'

const Message = ({ type, text, id }) => {
    const [showRecords, setShowRecords] = useState(false)

    const access = localStorage.getItem("access")

    return (
        <>
            <div className={`message ${type}`}>
                <p>{text}</p>
            </div>
            {(type === 'reply' && access === 'doctor' && id !== null) && (
                <button onClick={() => setShowRecords(true)}><IoDocumentText /> Abrir prontuário</button>
            )}
            {showRecords && (
                <Records id={id} text={text} onClose={() => setShowRecords(false)} />
            )}
        </>
    )
}

export default Message
