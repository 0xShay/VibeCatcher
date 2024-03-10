// File: client/encode-front-end/src/main.tsx
// This file contains main component

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Payments from './views/Payments';
import Dashboard from './views/dashboard.tsx'
import Home from './views/home.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        {/* Define other routes */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

);

