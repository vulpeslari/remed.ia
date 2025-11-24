import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, Zoom } from 'react-toastify';

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

import { TbStethoscope } from "react-icons/tb";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiUser } from 'react-icons/bi';

import useNavigationHelper from '../helpers/routes.js'
import { getPatient, createPatient } from '../helpers/connect.js'

import '../styles/patientForm.css'

const PatientForm = ({ typeForm, patientId }) => {
    const { goBack } = useNavigationHelper();
    const params = useParams(); 
    const id = patientId ?? params.id;
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

    const allergyOptions = [
        { value: '', label: '' },
    ];

    const historyOptions = [
        { value: 'Câncer', label: 'Câncer' },
        { value: 'Diabetes', label: 'Diabetes' },
        { value: 'Hipertensao', label: 'Hipertensão' }
    ];

    const sexOptions = [
        { value: 'F', label: 'Feminino' },
        { value: 'M', label: 'Masculino' },
        { value: 'Outro', label: 'Outro' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev, [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createPatient(
            {
                name: formData.name,
                data_de_nascimento: formData.dateBirth,
                peso: formData.weight,
                sexo: formData.sex?.value,
                altura: formData.height,
                alergias: formData.allergies.map(a => a.value).join(','),
                historico_medico: formData.history.map(h => h.value).join(','),
                temperatura: formData.temperature,
                oxigenacao: formData.oxygen,
                frequencia_cardiaca: formData.bpm
            }
        )
        toast.success(`Paciente ${formData.name} cadastrado!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });

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
                color: state.isSelected ? 'white' : 'gray'
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

    useEffect(() => {
        if (type) {
            const fetchPatient = async () => {
                const data = await getPatient(id);
                setFormData({
                    name: data.nome,
                    dateBirth: data.data_nascimento || '',
                    sex: sexOptions.find(opt => opt.value === data.sexo) || null,
                    weight: data.peso || '',
                    height: data.altura || '',
                    allergies: (data.alergias || '').split(',').filter(Boolean).map(a => ({ value: a.trim(), label: a.trim() })),
                    history: (data.historico_medico || '').split(',').filter(Boolean).map(h => ({ value: h.trim(), label: h.trim() })),
                    temperature: data.temperatura || '',
                    oxygen: data.oxigenacao || '',
                    bpm: data.frequencia_cardiaca || ''
                });
            };
            fetchPatient();
        }
    }, [type, id]);


    return (
        <div className='form-content'>
            {type
                ? <h1><BiUser /> {formData.name}</h1>
                : <h1><TbStethoscope /> Acolhimento</h1>
            }

            <form onSubmit={handleSubmit}>
                <h2>Dados do paciente</h2>

                {!type && <>
                    <div className='form-group'>
                        <label htmlFor='name'>Nome completo</label>
                        <input
                            type='text'
                            id='name'
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            readOnly={type}
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
                        value={formData.allergies.map(a => ({
                            ...a,
                            label: a.label.charAt(0).toUpperCase() + a.label.slice(1)
                        }))}
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
                        value={formData.history.map(h => ({
                            ...h,
                            label: h.label.charAt(0).toUpperCase() + h.label.slice(1)
                        }))}
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