import React from 'react'

import '../styles/root.css'
import Login from './widgets/login'

import { GiPoliceCar } from "react-icons/gi";

const Root = () => {
  return (
    <div className='main'>
      <div className='bg-img'></div>
      <header>
        <GiPoliceCar />
        <h1>CTB.pro</h1>
      </header>
      
      <div className='content'>
        <Login/>
      </div>
    </div>
  )
}

export default Root