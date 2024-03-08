import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Contact from './views/contact.tsx'
import Login from './views/login.tsx'
import About from './views/about.tsx'
// import Dashboard from './views/dashboard.tsx'
import Home from './views/home.tsx'
import Navbar from './components/navbar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />

    <Home />
    <Login />
    <About />
    <Contact />
  </React.StrictMode>,
)
