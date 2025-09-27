import React, { useState } from 'react'

import { IoDocumentText } from "react-icons/io5";

import Records from '../widgets/records'

const Message = ({ type }) => {
    const [showRecords, setShowRecords] = useState(false);

    const handleRecords = () => {
        setShowRecords(true);
    }

    return (
        <>
            <div className={`message ${type}`}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam volutpat eros et feugiat bibendum. Donec sit amet efficitur nibh, vitae facilisis tortor. In sed maximus massa. Vestibulum vitae magna sagittis, luctus erat quis, varius odio. Phasellus commodo dictum neque, quis varius urna dapibus eget. Morbi auctor hendrerit vehicula. Donec id.
                </p>
            </div>
            {type === 'reply' && (
                    <button onClick={handleRecords}><IoDocumentText/> Abrir prontuário</button>
                )}
            {showRecords && <Records onClose={() => setShowRecords(false)}/>}
        </>
    )
}

export default Message