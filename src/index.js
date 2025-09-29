import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import reportWebVitals from './reportWebVitals';

import './index.css';

import Home from './components/home';
import Root from './components/root';
import Navbar from './components/navbar';
import PatientForm from './components/patientForm'
import Patients from './components/patients'

import DoctorRoute from './helpers/doctorRoute'
import ReceptionRoute from './helpers/receptionRoute'

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
          <Route path="/home/:id" element={<Home />} />
        </Route>

        <Route element={<NavMenu />}>
          <Route path="/reception" element={
            <ReceptionRoute>
              <PatientForm typeForm='write' />
            </ReceptionRoute>
          } />
        </Route>
        
        <Route element={<NavMenu />}>
          <Route path="/patients" element={
            <DoctorRoute>
              <Patients />
            </DoctorRoute>
          } />
        </Route>
        <Route element={<NavMenu />}>
          <Route path="/patients/:id" element={
            <DoctorRoute>
              <PatientForm typeForm='read' />
            </DoctorRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);

reportWebVitals();
