// File: client/encode-front-end/src/views/home.tsx
// This file contains home view
// Importing necessary modules
import React from "react";
import About from "../components/about";
import Contacts from "../components/contacts";
import Footer from "../components/footer";
import Landing from "../components/landing";
import Landingend from "../components/landingend";
import Navbar from "../components/navbar";
import { useAuth } from "../context/AuthContext";
// import css

// Defining Home component (TypeScript)
const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <Landingend />
      <About />
      <Contacts />
      <Footer />
    </>
  );
};

export default HomePage;
