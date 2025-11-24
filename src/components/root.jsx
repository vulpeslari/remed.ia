import React from 'react'

import '../styles/root.css'
import Category from './widgets/category'

import { GiMedicines } from "react-icons/gi";

const Root = () => {
  return (
    <div className='main'>
      <div className='bg-img'></div>
      <header>
        <GiMedicines />
        <h1>Remed.IA</h1>
      </header>
      <h2>Quem está acessando?</h2>
      <div className='content'>
        <Category category={"Acolhimento"} token={"reception"}/>
        <Category category={"Médico"} token={"doctor"}/>
      </div>
    </div>
  )
}

export default Root