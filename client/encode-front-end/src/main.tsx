import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import Dashboard from './views/dashboard.tsx'
import Navbar from './components/navbar.tsx'
import About from './components/about.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
    <About/>

  </React.StrictMode>,
)
