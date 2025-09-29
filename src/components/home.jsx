import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PiUsersThree } from "react-icons/pi";
import { TbStethoscope } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import { ThreeDot } from 'react-loading-indicators';

import Message from '../components/widgets/message'
import useNavigationHelper from '../helpers/routes.js'
import { ask, createAppointment, getAppointment } from '../helpers/connect.js'

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
            id: crypto.randomUUID(),
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
            const messageReply = {
                id: crypto.randomUUID(),
                type: 'reply',
                text: data.answer
            }

            setMessages((prev) => [...prev, messageReply])

            if (access == 'doctor') {
                createAppointment(
                    {
                        id_paciente: patientId,
                        id_medico: 1,
                        motivo: messageSend.text,
                        diagnostico: messageReply.text
                    }
                )
            }
        } catch (e) {
            console.error(e)
        } finally {
            setInputText('')
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchAppointment = async () => {
            if (!routePatientId) return;

            try {
                const appointment = await getAppointment(routePatientId);

                if (appointment) {
                    setPatientId(parseInt(routePatientId));

                    const historyMessages = [
                        { type: 'send', text: appointment?.[0].motivo },
                        { type: 'reply', text: appointment?.[0].diagnostico }
                    ];

                    setMessages(historyMessages);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchAppointment();
    }, [routePatientId]);


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
                {messages.map((msg) => (
                    <Message key={msg.id} id={patientId} type={msg.type} text={msg.text} />
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