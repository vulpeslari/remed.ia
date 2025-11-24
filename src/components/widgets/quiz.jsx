import React, { useState } from 'react'

import { IoIosArrowBack } from "react-icons/io";

const Quiz = ({ onClose, id }) => {
    var img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA-7UIYLcEK1mAwct1XgW8aSMnvm3ZEQBYgQ&s";

    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const options = [
        { text: "a", correct: true },
        { text: "b", correct: false },
        { text: "c", correct: false },
        { text: "d", correct: false }
    ];

    const handleClick = (option, index) => {
        setSelected(index);
        setIsCorrect(option.correct);
    };

    return (
        <div className='pop-up'>
            <div className='pop-up-content'>
                <div className="quiz">
                    <div className='quiz-header'>
                        <IoIosArrowBack onClick={onClose}/>
                        
                        <h3>Tag</h3>
                    </div>
                    <h2>Pergunta aqui</h2>
                    {img && <img src={img} />}

                    {options.map((opt, i) => (
                        <li
                            key={i}
                            className={`option ${selected === i ? (isCorrect ? "correct" : "wrong") : ""
                                }`}
                            onClick={() => handleClick(opt, i)}
                        >
                            {opt.text}
                        </li>

                    ))}

                    
                </div>
            </div>
        </div>
    )
}

export default Quiz