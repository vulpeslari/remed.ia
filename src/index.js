import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import reportWebVitals from './reportWebVitals';

import './index.css';

import Home from './components/home';
import Root from './components/root';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />

        <Route>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route>
          <Route path="/home/:id" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);

reportWebVitals();
