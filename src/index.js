import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import './index.css';

import Home from './components/home';
import Root from './components/root';
import Navbar from './components/navbar';
import PatientForm from './components/patientForm'
import Patients from './components/patients'

function NavMenu() {
  return (
    <div className='flex-content'>
      <Navbar />
      <main className='main-content'>
        <Outlet />
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />

        <Route element={<NavMenu />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route element={<NavMenu />}>
          <Route path="/reception" element={<PatientForm typeForm='write'/>} />
        </Route>
        <Route element={<NavMenu />}>
          <Route path="/patients" element={<Patients/>} />
        </Route>
        <Route element={<NavMenu />}>
          <Route path="/patients/:id" element={<PatientForm typeForm='read'/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
