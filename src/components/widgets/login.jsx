import React, { useState } from 'react';
import useNavigationHelper from '../../helpers/routes';

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
    const { goHome } = useNavigationHelper();
    const [showPassword, setShowPassword] = useState(false); 

    const onClick = (e) => {
        e.preventDefault(); 
        localStorage.setItem("access", 'true');
        goHome();
    };

    return (
        <div className='login-card'>
            <h2>Identifique-se</h2>
            <form onSubmit={onClick}>
                <fieldset>
                    <legend>Nome</legend>
                    <input type='text' id='name' name='name' required />
                </fieldset>
                <fieldset>
                    <legend>Senha</legend>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            required
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash/> : <FaRegEye/>}
                        </button>
                    </div>
                </fieldset>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;
