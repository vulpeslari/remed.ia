import React, { useState } from 'react'

import { IoDocumentText } from "react-icons/io5"
import { TbGraph } from "react-icons/tb";

import Stats from './stats';
import Quiz from './quiz';

const Message = ({ type, text, route, id }) => {
    const [showQuiz, setShowQuiz] = useState(false)
    const [showStats, setShowStats] = useState(false)

    return (
        <>
            <div className={`message ${type}`}>
                <p>{text}</p>
            </div>

            {(type === 'reply' && id !== null) && (
                <>
                    {route === 'quiz' && (
                        <button onClick={() => setShowQuiz(true)}>
                            <IoDocumentText /> Iniciar teste
                        </button>
                    )}

                    {route === 'stats' && (
                        <button onClick={() => setShowStats(true)}>
                            <TbGraph /> Acessar estatísticas
                        </button>
                    )}
                </>
            )}

            {showStats && (
                <Stats id={id} text={text} onClose={() => setShowStats(false)} />
            )}

            {showQuiz && (
                <Quiz id={id} text={text} onClose={() => setShowQuiz(false)} />
            )}
        </>
    )
}

export default Message
