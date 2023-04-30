import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation} from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";
import Home from "./components/Home/Home.jsx";
import Dogs from './components/Dogs/Dogs.jsx';
import Temperaments from "./components/Temperaments/Temperaments.jsx";
import About from './components/About/About.jsx' ;
import Footer from "./components/Footer/Footer.jsx";
import { searchTemps, searchDogs } from "./redux/actions/actions.js"

function App() {

   const location = useLocation();
   const dispatch = useDispatch();
   const { allFavs, allDogs } = useSelector((s) => s);

   useEffect(() => {
      dispatch(searchTemps());
   }, []);
   
   useEffect(() => {
      dispatch(searchDogs());
   }, [allFavs, allDogs]);

  return (
    <div className="App">
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
