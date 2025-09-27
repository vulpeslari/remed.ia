import React, { useState } from 'react'

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

import { TbStethoscope } from "react-icons/tb";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiUser } from 'react-icons/bi';

import useNavigationHelper from '../helpers/routes.js'

import '../styles/patientForm.css'

const PatientForm = ({ typeForm }) => {
    const { goBack } = useNavigationHelper();
    const type = typeForm == 'read' ? true : false;

    const [formData, setFormData] = useState({
        name: null,
        dateBirth: '',
        sex: null,
        weight: '',
        height: '',
        allergies: [],
        history: [],
        temperature: '',
        oxygen: '',
        bpm: ''
    });

    const nameOptions = [
        { value: '', label: '' },
    ];

    const allergyOptions = [
        { value: '', label: '' },
    ];

    const historyOptions = [
        { value: 'cancer', label: 'Câncer' },
        { value: 'diabetes', label: 'Diabetes' },
        { value: 'hipertensao', label: 'Hipertensão' }
    ];

    const sexOptions = [
        { value: 'Feminino', label: 'Feminino' },
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Outro', label: 'Outro' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev, [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        goBack();
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            border: 'none',
            backgroundColor: 'white',
            boxShadow: state.isFocused ? 'none' : base.boxShadow,
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? 'var(--primary)'
                : state.isFocused
                    ? 'var(--terciary)'
                    : 'white',
            '&:hover': {
                backgroundColor: state.isSelected ? 'var(--primaryVariant)' : 'var(--terciary)',
                color: state.isSelected ? 'white' : '#333'
            },
            cursor: 'pointer',
            transition: 'all .3s ease'
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: 'var(--primary)',
            color: 'white'
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: 'white'
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: 'white',
            ':hover': {
                backgroundColor: 'var(--primaryVariant)',
                color: 'white'
            }
        })
    };

    return (
        <div className='form-content'>
            {type
                ? <h1><BiUser /> Paciente</h1>
                : <h1><TbStethoscope /> Acolhimento</h1>
            }

            <form onSubmit={handleSubmit}>
                <h2>Dados do paciente</h2>

                {!type && <>
                    <div className='form-group'>
                        <label htmlFor='name'>Nome completo</label>
                        <CreatableSelect
                            id='name'
                            isClearable
                            options={nameOptions}
                            value={formData.name}
                            onChange={(selectedOption) => handleInputChange('name', selectedOption)}
                            placeholder=""
                            styles={customStyles}
                            isDisabled={type}
                        />
                    </div>
                </>}

                <div className='form-row'>
                    <div className='form-group'>
                        <label htmlFor='dateBirth'>Data de nascimento</label>
                        <input
                            type='date'
                            id='dateBirth'
                            value={formData.dateBirth}
                            onChange={(e) => handleInputChange('dateBirth', e.target.value)}
                            readOnly={type}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='sex'>Sexo</label>
                        <Select
                            id='sex'
                            options={sexOptions}
                            value={formData.sex}
                            onChange={(selectedOption) => handleInputChange('sex', selectedOption)}
                            placeholder=""
                            styles={customStyles}
                            isDisabled={type}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='weight'>Peso (kg)</label>
                        <input
                            type='number'
                            id='weight'
                            value={formData.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                            readOnly={type}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='height'>Altura (cm)</label>
                        <input
                            type='number'
                            id='height'
                            value={formData.height}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                            readOnly={type}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='allergies'>Alergias?</label>
                    <CreatableSelect
                        id='allergies'
                        isMulti
                        isClearable
                        options={allergyOptions}
                        value={formData.allergies}
                        onChange={(selectedOptions) => handleInputChange('allergies', selectedOptions)}
                        placeholder=""
                        styles={customStyles}
                        isDisabled={type}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='history'>Histórico hospitalar familiar</label>
                    <CreatableSelect
                        id='history'
                        isMulti
                        isClearable
                        options={historyOptions}
                        value={formData.history}
                        onChange={(selectedOptions) => handleInputChange('history', selectedOptions)}
                        placeholder=""
                        styles={customStyles}
                        isDisabled={type}
                    />
                </div>
                <h2>Triagem</h2>
                <div className='form-row'>
                    <div className='form-group'>
                        <label htmlFor='temperature'>Temperatura (°C)</label>
                        <input
                            type='text'
                            id='temperature'
                            value={formData.temperature}
                            onChange={(e) => handleInputChange('temperature', e.target.value)}
                            readOnly={type}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='oxygen'>Oxigenação (%)</label>
                        <input
                            type='text'
                            id='oxygen'
                            value={formData.oxygen}
                            onChange={(e) => handleInputChange('oxygen', e.target.value)}
                            readOnly={type}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bpm'>Frequência cardíaca (BPM)</label>
                        <input
                            type='text'
                            id='bpm'
                            value={formData.bpm}
                            onChange={(e) => handleInputChange('bpm', e.target.value)}
                            readOnly={type}
                        />
                    </div>
                </div>
                <div className='buttons'>
                    <button type="button" onClick={() => goBack()}>
                        <FaArrowLeftLong /> Voltar
                    </button>
                    {!type && <button type="submit">Salvar</button>}
                </div>
            </form>
        </div >
    )
}

export default PatientForm