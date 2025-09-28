import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PiUsersThree } from "react-icons/pi";
import { TbStethoscope } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import { ThreeDot } from 'react-loading-indicators';

import Message from '../components/widgets/message'
import useNavigationHelper from '../helpers/routes.js'
import { ask, createAppointment } from '../helpers/connect.js'

import '../styles/home.css'

const Home = () => {
    const { id: routePatientId } = useParams()
    const navigate = useNavigate()
    const { goPatients, goReception } = useNavigationHelper();

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [patientId, setPatientId] = useState(null)
    const [hasCheckedId, setHasCheckedId] = useState(false)

    let access = localStorage.getItem("access");

    const onClick = () => {
        access == "doctor" ? goPatients() : goReception();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputText.trim()) return;

        const messageSend = {
            type: 'send',
            text: inputText.trim(),
        };
        setMessages((prev) => [...prev, messageSend])
        setLoading(true)

        try {
            const idResponse = await ask(
                access,
                `Com base no texto, qual é o id_paciente do paciente? Retorne APENAS o id_paciente e nada mais. ${inputText.trim}`
            )

            const match = idResponse.answer?.match(/\d+/)
            const patientId = match ? parseInt(match[0]) : null

            if (!isNaN(patientId)) {
                setPatientId(patientId)

                if (!routePatientId || parseInt(routePatientId) !== patientId) {
                    navigate(`/home/${patientId}`)
                }
            }
        } catch (e) {
            console.error(e)
        }

        try {
            const data = await ask(access, inputText.trim())
            const messageReply = { type: 'reply', text: data.answer }

            setMessages((prev) => [...prev, messageReply])

            
        } catch (e) {
            console.error(e)
        } finally {
            setInputText('')
            setLoading(false)
        }
    }


    return (
        <div className='home-content'>
            <div className='bg-img'></div>
            <header>
                <button onClick={onClick}>{access == "doctor" ?
                    <><PiUsersThree /> Pacientes</>
                    : <><TbStethoscope /> Acolhimento</>}
                </button>
            </header>
            <div className='chat'>
                {messages.length === 0 && (
                    <h4>Digite para conversar com <span>Remed.IA</span>.</h4>
                )}
                {messages.map((msg, i) => (
                    <Message key={i} id={patientId} type={msg.type} text={msg.text} />
                ))}
                {loading && (
                    <div className="loading">
                        <ThreeDot color="var(--secondaryVariant)" size="small" text="" textColor="" />
                    </div>
                )}
            </div>
            <div className='input-message'>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    placeholder='Converse com Remed.IA...'>
                </textarea>
                <IoMdSend onClick={handleSubmit} size={24} />
            </div>
        </div>
    )
}

export default Home