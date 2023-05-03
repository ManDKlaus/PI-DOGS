import React from 'react'
import "./Nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
      <ul className='Nav' >
        <li>
          <Link id="logo" to="/home" >
            <span className="material-symbols-rounded">
              pets
            </span>             
            <h1>DOG<span>s</span></h1>
          </Link>
        </li>
        <li>
          <Link to="/home" >
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" >
            How I am?
          </Link>
        </li>
        <li>
          <Link to="/home#temperaments" onClick={() => {
            const section = document.querySelector("#temperaments");
            section.scrollIntoView({ behavior: "smooth" });
          }} >
            Temperaments
          </Link>
        </li>
        <li>
          <Link to="/home#dogs" onClick={() => {
            const section = document.querySelector("#dogs");
            section.scrollIntoView({ behavior: "smooth" });
          }} >
            Dogs
          </Link>
        </li>
        <li>
          <Link to="/home#details" onClick={() => {
            const section = document.querySelector("#details");
            section.scrollIntoView({ behavior: "smooth" });
          }} >
            Details
          </Link>
        </li>
        <li>
          <Link to="/home#create" onClick={() => {
            const section = document.querySelector("#create");
            section.scrollIntoView({ behavior: "smooth" });
          }} >
            Create
          </Link>
        </li>
        <li>
          <Link to="/" >
            <span className="material-symbols-rounded">
              logout
            </span>
          </Link>
        </li>
      </ul>
  )
}
