import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import Dashboard from './views/dashboard.tsx'
import Navbar from './components/navbar.tsx'
import About from './components/about.tsx'
import Landing from './components/landing.tsx'
import Landingend from './components/landingend.tsx'
import Contacts from './components/contacts.tsx'
import Footer from './components/footer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
    <Landing/>
    <Landingend/>
    <About/>
    <Contacts/>
    <Footer/>

  </React.StrictMode>,
)
