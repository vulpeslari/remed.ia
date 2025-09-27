import React, { useState, useRef } from 'react'

import '../styles/home.css'

import { PiUsersThree } from "react-icons/pi";
import { TbStethoscope } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import { IoIosAttach } from "react-icons/io";
import { IoMdClose } from 'react-icons/io';
import { MdOutlineDriveFolderUpload } from "react-icons/md";

import Message from '../components/widgets/message'
import useNavigationHelper from '../helpers/routes.js'

const Home = () => {
    const { goPatients, goReception } = useNavigationHelper();
    const [fileName, setFileName] = useState('');
    const fileRef = useRef(null);

    let access = localStorage.getItem("access");

    const onClick = () => {
        access == "doctor" ? goPatients() : goReception();
    }

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
    };

    const removeFile = () => {
        setFileName('');
        if (fileRef.current) {
            fileRef.current.value = null;
        }
    };

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
                <Message type='send' />
                <Message type='reply' />
            </div>
            <div className='input-message'>
                <textarea placeholder='Converse com Remed.IA...'>
                </textarea>
                <div className='file'>
                    <label for='attachment'><MdOutlineDriveFolderUpload size={20} /></label>
                    <input type="file" id="attachment" onChange={handleFileChange} ref={fileRef} />
                    {fileName && (
                        <span>
                            <IoIosAttach size={16} style={ {cursor: 'auto'} }/> {fileName} <IoMdClose size={16} onClick={removeFile} />
                        </span>
                    )}
                </div>
                <IoMdSend size={24} />
            </div>
        </div>
    )
}

export default Home