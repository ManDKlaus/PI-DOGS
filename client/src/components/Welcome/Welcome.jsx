import "./Welcome.css";
import React from 'react';
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className='Welcome'>
        <h1>Welcome to my dogs page</h1>
        <Link to="/home">Start adventure</Link>
    </div>
  )
}
