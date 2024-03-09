// File: client/encode-front-end/src/main.tsx
// This file contains main component

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Navbar from './components/navbar.tsx'
import Dashboard from './views/dashboard.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
    <Dashboard />

  </React.StrictMode>,
)
