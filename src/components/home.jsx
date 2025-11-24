import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { GiPoliceCar } from "react-icons/gi";
import { IoMdSend } from "react-icons/io";
import { ThreeDot } from 'react-loading-indicators';

import Message from '../components/widgets/message'
import useNavigationHelper from '../helpers/routes.js'
import { ask } from '../helpers/connect.js'

import '../styles/home.css'

const Home = () => {
    const { goRoot } = useNavigationHelper();

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

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
            const data = await ask(inputText.trim())

            const messageReply = {
                id: crypto.randomUUID(),
                type: 'reply',
                text: data
            }

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
                <div>
                    <GiPoliceCar />
                    <h1 onClick={goRoot}>CTB.pro</h1>
                </div>
                <h2>Bem-vindo, <b>usuário</b>!</h2>
            </header>
            <div className='chat'>
                {messages.length === 0 && (
                    <h4>Digite para conversar com <span>CTB.pro</span>.</h4>
                )}
                {messages.map((msg) => (
                    <Message key={msg.id} type={msg.type} text={msg.text} />
                ))}
                {loading && (
                    <div className="loading">
                        <ThreeDot color="var(--primary)" size="small" text="" textColor="" />
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
                    placeholder='Converse com CTB.pro...'>
                </textarea>
                <IoMdSend onClick={handleSubmit} size={24} />
            </div>
        </div>
    )
}

export default Home