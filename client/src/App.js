import './App.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation} from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";
import Home from "./components/Home/Home.jsx";
import Dogs from './components/Dogs/Dogs.jsx';
import Temperaments from "./components/Temperaments/Temperaments.jsx";
import About from './components/About/About.jsx' ;
import Details from "./components/Details/Details.jsx"
import Footer from "./components/Footer/Footer.jsx";
import { searchTemps, searchDogs } from "./redux/actions/actions.js"

function App() {

   const location = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(searchTemps());
      dispatch(searchDogs());
   }, []);

   const [mode, setMode] = useState('day');
   function handlerMode() {
      setMode(mode === 'day' ? 'night' : 'day');
   };

   return (
      <div className={`App ${mode}`}>
         <div className='Mode' >
            <button onClick={handlerMode} />
         </div>
         {
            location.pathname === "/" ? null : <Nav />
         }
         <Routes>
            <Route
               path="/"
               element={<Welcome />}
            />
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
            <Route 
               path="/details"
               element={<Details />}
            />
         </Routes>
         {
            location.pathname === "/" ? null : <Footer />
         }
      </div>
  );
}

export default App;
