import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  // Obtener la posición de desplazamiento de la sesión del navegador
  const savedScrollPosition = window.sessionStorage.getItem('scrollPosition');
  
  useEffect(() => {
    // Desplazarse a la posición almacenada en la sesión si existe
    if (savedScrollPosition) {
      const section = document.querySelector(savedScrollPosition);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      // Eliminar la posición almacenada de la sesión
      window.sessionStorage.removeItem('scrollPosition');
    }
  }, [savedScrollPosition]);

  const handleLinkClick = (e, id) => {
    // Almacenar la posición de desplazamiento en la sesión del navegador
    window.sessionStorage.setItem('scrollPosition', id);
  }

  return (
    <ul className='Nav' >
      <li>
        <Link id="logo" to="/home" onClick={(e) => handleLinkClick(e, '#home')} >
          <span className="material-symbols-rounded" >
            pets
          </span>             
          <h1>DOG<span>s</span></h1>
        </Link>
      </li>
      <li>
        <Link to="/home" onClick={(e) => handleLinkClick(e, '#home')} >
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" onClick={(e) => handleLinkClick(e, '#top')} >
          Who I am?
        </Link>
      </li>
      <li>
        <Link to="/home" onClick={(e) => handleLinkClick(e, '#temperaments')} >
          Temperaments
        </Link>
      </li>
      <li>
        <Link to="/home" onClick={(e) => handleLinkClick(e, '#dogs')} >
          Dogs
        </Link>
      </li>
      <li>
        <Link to="/home" onClick={(e) => handleLinkClick(e, '#details')} >
          Details
        </Link>
      </li>
      <li>
        <Link to="/home" onClick={(e) => handleLinkClick(e, '#create')} >
          Create
        </Link>
      </li>
      <li>
        <Link to="/">
          <span className="material-symbols-rounded" >
            logout
          </span>
        </Link>
      </li>
    </ul>
  )
}
