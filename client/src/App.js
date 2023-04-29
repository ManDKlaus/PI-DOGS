import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Nav from "./components/Nav/Nav.jsx";
import Home from "./components/Home/Home.jsx";
import Dogs from './components/Dogs/Dogs.jsx';
import Temperaments from "./components/Temperaments/Temperaments.jsx";
import About from './components/About/About.jsx' ;
import Footer from "./components/Footer/Footer.jsx";

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
         <Route 
            path="/home"
            element={<Home />}                              
         />
         <Route 
            path="/about"
            element={<About />}                              
         />
         <Route 
            path="/dogs"
            element={<Dogs />}                              
         />
         <Route
            path="/temperaments"
            element={<Temperaments />}
         />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
