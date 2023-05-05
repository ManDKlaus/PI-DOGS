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
import { searchTemps, searchDogs, searchFav } from "./redux/actions/actions.js"

function App() {

   const location = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(searchDogs());
      dispatch(searchTemps());
      dispatch(searchFav());
   }, [dispatch]);

   useEffect(() => {
      const app = document.querySelector(".App");
      const blocks = Array.from({ length: 180 }, () => {
         const size = getRandomInt(20, 60);
         const block = document.createElement("div");
         block.classList.add("block");
         block.style.transform = `scale(${Math.random() * (2 - 1) + 1})`;
         block.style.top = `${getRandomInt(0, window.innerHeight)}px`;
         block.style.left = `${getRandomInt(0, window.innerWidth)}px`;
         block.style.transform = `rotate(${getRandomInt(0, 360)}deg)`;
         block.style.width = `${size}px`;
         block.style.height = `${size}px`;
         app.appendChild(block);
         return block;
      });       
      return () => {
         blocks.forEach((block) => app.removeChild(block));
      }
   }, []);
      
   function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
   }

   const [mode, setMode] = useState('day');
   function handlerMode() {
      setMode(mode === 'day' ? 'night' : 'day');
   };

   return (
      <div className={`App ${mode}`} >
            <div className='Mode' onClick={handlerMode} >
               <span className="material-symbols-rounded">
                  light_mode
               </span>
               <span className="material-symbols-rounded">
                  dark_mode
               </span>
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
            </Routes>
      </div>
   );
}

export default App;
